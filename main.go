package main

import (
	"inc-nlp-service-echo/commons"
	"inc-nlp-service-echo/controllers"
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/repositories"
	"inc-nlp-service-echo/services"
	"inc-nlp-service-echo/websockets"
	"os"

	// docs folder to server swagger
	_ "inc-nlp-service-echo/docs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	log "github.com/sirupsen/logrus"
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

// @host localhost:9000
// @BasePath /
func main() {
	// Configuration
	common0 := commons.NewFillChatSelectENV()
	common1 := commons.NewFillChatMiddleware()

	// do something here to set environment depending on an environment variable
	// or command-line flag
	if common0.Env != "development" {
		log.SetFormatter(&log.JSONFormatter{})
	} else {
		// The TextFormatter is default, you don't actually have to do this.
		log.SetFormatter(&log.TextFormatter{})
	}
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
	// log.SetReportCaller(true)

	// Websocket http upgrader

	// Echo instance
	e := echo.New()

	ws := websockets.NewWebSocket()

	// Middleware
	e.Use(
		middleware.Logger(),
		middleware.Recover(),
		middleware.RequestID(),
	)

	// sync GORM
	orm := datasources.SyncGORM(common0)

	// Repositories
	repo0 := repositories.NewNlpTrainingRecordRepository(orm)
	repo1 := repositories.NewNlpRecordRepository(orm)
	repo3 := repositories.NewShopStoryRepository(orm)
	repo4 := repositories.NewStoryRepository(orm)
	repo5 := repositories.NewShopStoryRepository(orm)
	repo6 := repositories.NewShopRepository(orm)

	// Services
	svc0 := services.NewNlpRecordService(repo1, repo0, repo3)
	svc1 := services.NewStoryService(repo4)
	svc2 := services.NewShopStoryService(repo5, repo6)
	svc3 := services.NewShopService(repo6)

	// Controllers
	c0 := controllers.NewNlpController(svc0)
	c2 := controllers.NewFBWebhookController(svc0, *ws.Upgrader)
	c3 := controllers.NewStoryController(svc1)
	c4 := controllers.NewShopStoryController(svc2)
	c5 := controllers.NewShopController(svc3)

	// Static
	e.Static("/", "public")

	// Swagger
	q := e.Group("/swagger")
	q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	// Routes
	e.GET("/v1/story", c3.ReadAllStoryRecordController)
	e.POST("/v1/story", c3.NewStoryRecordController)
	e.DELETE("/v1/story", c3.DeleteStoryByIDController)

	e.GET("/v1/shop", c5.ReadShopByIDController)
	// e.POST("/v1/shop", c5.ReadShopByIDController)
	// e.DELETE("/v1/shop", c5.ReadShopByIDController)

	e.POST("/v1/shop/story", c4.CreateShopStoryController)
	// e.GET("/v1/shop/story", c4.CreateShopStoryController)
	// e.DELETE("/v1/shop/story", c4.CreateShopStoryController)

	e.POST("/v1/nlp/record", c0.CreateNlpRecordByShopController)
	e.POST("/v1/nlp/record/upload.xlsx", c0.UploadXlsxNlpRecordByShopController)
	e.DELETE("/v1/nlp/record", c0.DropNlpRecordByShopController)
	e.GET("/v1/nlp/record", c0.ReadNlpRecordByShopController)
	e.GET("/v1/nlp/record/reply", c0.ReadNlpReplyModelByShopController)
	e.GET("/v1/fb/webhook", c2.VerifyFBWebhookController)
	e.POST("/v1/fb/webhook", c2.ReplyFBWebhookController)
	e.Any("/v1/fb/webhook/socket.io", c2.ReplyFBWebhookSocketIO)
	// e.GET("/v1/fb/webhook/socket.io", websockets.NewWebSocket)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))
	defer e.Close()
	defer orm.Close()
}
