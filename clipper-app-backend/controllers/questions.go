package controllers

import (
	"myapp/database"
	"myapp/models"
	"sort"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllQuestions(c *fiber.Ctx) error {
	db := database.DB
	var questions []models.Questions
	db.Preload("Answers").Find(&questions)
	return c.JSON(&questions)
}

func GetHotQuestions(c *fiber.Ctx) error {
	db := database.DB
	var hot_questions []models.Questions
	db.Preload("Answers").Find(&hot_questions)

	sort.Slice(hot_questions, func(i, j int) bool {
		first, _ := strconv.Atoi(hot_questions[i].ThumbsUp)
		second, _ := strconv.Atoi(hot_questions[j].ThumbsUp)
		return first > second
	})
	return c.JSON(&hot_questions)
}

func GetQuestionById(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var question models.Questions
	db.Preload("Answers").Find(&question, id)
	if question.Question == "" {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "No question with that ID",
		})
	}
	return c.JSON(question)
}

func CreateQuestion(c *fiber.Ctx) error {
	var data models.Questions
	db := database.DB
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "Could not POST question",
		})
	}
	question := models.Questions{
		Question: data.Question,
		ThumbsUp: data.ThumbsUp,
	}
	db.Preload("Answers").Create(&question)
	return c.JSON(question)
}

func AddAnswer(c *fiber.Ctx) error {
	var data models.Questions
	db := database.DB
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "Could not POST question",
		})
	}
	var question models.Questions
	db.Where("id = ?", data.Id).First(&question)
	question.Answers = data.Answers
	db.Preload("Answers").Save(&question)
	return c.JSON(question)
}

func ThumbsUp(c *fiber.Ctx) error {
	var data models.Questions
	db := database.DB
	if err := c.BodyParser(&data); err != nil { //get all request data we send
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"message": "Could not UPDATE ThubmsUp",
		})
	}
	var question models.Questions
	db.Where("id = ?", data.Id).First(&question)
	temp, _ := strconv.Atoi(question.ThumbsUp)
	temp++
	question.ThumbsUp = strconv.Itoa(temp)
	db.Preload("Answers").Save(&question)
	return c.JSON(question)
}
