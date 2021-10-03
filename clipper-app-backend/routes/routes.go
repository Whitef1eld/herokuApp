package routes

import (
	"myapp/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	//User routes
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
	app.Put("/api/admin", controllers.UpdateUser)
	app.Post("/api/my-questions", controllers.MyQuestions)
	app.Post("/api/my-questions", controllers.GetMyQuestions)
	app.Put("/api/update-answer", controllers.UpdateAnswer)
	app.Get("/api/active-users", controllers.GetMostActiveUsers)

	//Questions routes
	app.Get("/api/questions", controllers.GetAllQuestions)
	app.Get("/api/hot-questions", controllers.GetHotQuestions)
	app.Get("/api/questions/:id", controllers.GetQuestionById)
	app.Post("/api/questions", controllers.CreateQuestion)
	app.Post("/api/answer", controllers.AddAnswer)
	app.Put("/api/thumbsup", controllers.ThumbsUp)
}
