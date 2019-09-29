package main

import (
	"inc-nlp-service-echo/commons"
	"inc-nlp-service-echo/controllers"
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/repositories"
	"inc-nlp-service-echo/services"

	// docs folder to server swagger
	_ "inc-nlp-service-echo/docs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
)

// @title Swagger Example API
// @version 1.0
// @description This is a sample server Petstore server.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host petstore.swagger.io
// @BasePath /v1
func main() {
	// OS ENV configuration
	config := commons.NewFillChat12Factor()

	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(
		middleware.Logger(),
		middleware.Recover(),
		middleware.RequestID(),
	)

	// sync GORM
	orm := datasources.SyncGORM(config)

	// Repositories
	nlpTrainingRecordRepo := repositories.NewNlpTrainingRecordRepository(orm)
	nlpRecordRepo := repositories.NewNlpRecordRepository(orm)

	// Services
	nlpRecordService := services.NewNlpRecordService(nlpRecordRepo, nlpTrainingRecordRepo)

	// Controllers
	c := controllers.NewNlpController(nlpRecordService)
	c2 := controllers.NewFBWebhookController(nlpRecordService)

	// Static
	e.Static("/", "public")

	// Routes
	e.POST("/v1/nlp/record", c.CreateNlpRecordByShopController)
	e.POST("/v1/nlp/record/upload.xlsx", c.UploadXlsxNlpRecordByShopController)
	e.DELETE("/v1/nlp/record", c.DropNlpRecordByShopController)
	e.GET("/v1/nlp/record", c.ReadNlpRecordByShopController)
	e.GET("/v1/nlp/record/reply", c.ReadNlpReplyModelByShopController)
	e.GET("/v1/fb/webhook", c2.VerifyFBWebhookController)
	e.POST("/v1/fb/webhook", c2.ReplyFBWebhookController)

	// Swagger
	if config.IsSwagger == "true" {
		e.GET("/swagger/*", echoSwagger.WrapHandler)
	}

	// Start server
	e.Logger.Fatal(e.Start(":" + config.EchoPort))
}
