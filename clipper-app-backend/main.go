package main

import (
	"myapp/database"
	"myapp/routes"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	database.Connect()
	port := os.Getenv("PORT")
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true, //so frontend can send cookie back
	})) //if we don't add this browser will not allow request

	routes.Setup(app)
	app.Listen(":" + port)
}
