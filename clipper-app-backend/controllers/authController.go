package controllers

import (
	"myapp/database"
	"myapp/models"
	"sort"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

const SECRET_KEY = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14) //hashing the password

	user := models.User{
		Name:     data["name"],
		Lastname: data["lastname"],
		Email:    data["email"],
		Password: password,
		Answers:  "0",
	}

	database.DB.Preload("Questions").Create(&user) //inserting user to database

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).Preload("Questions").First(&user) //we get user based on email

	if user.Id == 0 { //if we don't find a user we set status to not found
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil { //compare passwords if user is found
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{ // claims
		Issuer:    strconv.Itoa(int(user.Id)),            //Issuer is user
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	token, err := claims.SignedString([]byte(SECRET_KEY)) // jwt token with secret key
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}

	cookie := fiber.Cookie{ //storing in cookie
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24), //1 day,
		HTTPOnly: true,                           //so frontend can't access
	}

	c.Cookie(&cookie)

	//successfully found user with right password
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt") //getting the cookie

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) { //getting a token with our secret key
		return []byte(SECRET_KEY), nil
	})

	if err != nil { //If no match, send error "Unauthenticated"
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims) //Get claims from token
	var user models.User

	database.DB.Where("id = ?", claims.Issuer).Preload("Questions").First(&user)
	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error { //removing cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func UpdateUser(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		return err
	}

	cookie := c.Cookies("jwt") //getting the cookie

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) { //getting a token with our secret key
		return []byte(SECRET_KEY), nil
	})

	if err != nil { //If no match, send error "Unauthenticated"
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14) //hashing the password

	claims := token.Claims.(*jwt.StandardClaims) //Get claims from token
	var user models.User

	database.DB.Where("id = ?", claims.Issuer).Preload("Questions").First(&user)
	if user.Id == 0 { //if we don't find a user we set status to not found
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}
	if user.Name != "" && data["name"] != "" {
		user.Name = data["name"]
	}

	if user.Lastname != "" && data["lastname"] != "" {
		user.Lastname = data["lastname"]
	}

	if user.Email != "" && data["email"] != "" {
		user.Email = data["email"]
	}

	if len(user.Password) != 0 && len(data["password"]) != 0 {
		user.Password = password
	}
	database.DB.Preload("Questions").Save(&user)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func MyQuestions(c *fiber.Ctx) error {
	var data models.User
	db := database.DB
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "Could not POST question",
		})
	}
	var user models.User
	db.Where("id = ?", data.Id).First(&user)
	if user.Id == 0 { //if we don't find a user we set status to not found
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}
	user.Questions = data.Questions
	db.Preload("Questions").Save(&user)
	return c.JSON(user)
}

func GetMyQuestions(c *fiber.Ctx) error {
	var data models.User
	db := database.DB
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "Could not POST question",
		})
	}
	var user models.User
	db.Where("id = ?", data.Id).Preload("Questions").First(&user)
	myquestions := user.Questions
	return c.JSON(myquestions)

}

func UpdateAnswer(c *fiber.Ctx) error {
	var data models.User
	db := database.DB
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "Could not UPDATE Answer",
		})
	}
	var question models.User
	db.Where("id = ?", data.Id).First(&question)
	temp, _ := strconv.Atoi(question.Answers)
	temp++
	question.Answers = strconv.Itoa(temp)
	db.Preload("Questions").Save(&question)
	return c.JSON(question)
}

func GetMostActiveUsers(c *fiber.Ctx) error {
	db := database.DB
	var active_users []models.User
	db.Preload("Answers").Find(&active_users)

	sort.Slice(active_users, func(i, j int) bool {
		first, _ := strconv.Atoi(active_users[i].Answers)
		second, _ := strconv.Atoi(active_users[j].Answers)
		return first > second
	})
	return c.JSON(&active_users)
}
