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
		middleware.Gzip(),
	)

	// sync GORM
	orm := datasources.NewFillChatGORM(common0)

	orm.DB.LogMode(true)

	// Repositories
	repo0 := repositories.NewNlpTrainingLogRepository(orm)
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
	svc4 := services.NewNlpTrainingLogService(repo0)

	// Controllers
	c0 := controllers.NewNlpController(svc0)
	c2 := controllers.NewFBWebhookController(svc0, *ws.Upgrader)
	c3 := controllers.NewStoryController(svc1)
	c4 := controllers.NewShopStoryController(svc2)
	c5 := controllers.NewShopController(svc3)
	c6 := controllers.NewNlpTrainingLogController(svc4)

	// Static
	e.Static("/", "public")
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "public",
		Browse: true,
		HTML5:  true,
	}))

	// Swagger
	q := e.Group("/swagger")
	q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	// Routes
	v1 := e.Group("/v1")

	v1.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Extract the credentials from HTTP request header and perform a security
			// check

			// For invalid credentials
			// return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid credentials")

			// For valid credentials call next
			return next(c)
		}
	})

	v1.GET("/story", c3.ReadAllStoryRecordController)
	v1.POST("/story", c3.NewStoryRecordController)
	v1.DELETE("/story", c3.DeleteStoryByIDController)
	v1.GET("/shop", c5.ReadShopByIDController)
	v1.POST("/shop/story", c4.CreateShopStoryController)
	v1.POST("/nlp/record", c0.CreateNlpRecordByShopController)
	v1.POST("/nlp/record/upload.xlsx", c0.UploadXlsxNlpRecordByShopController)
	v1.DELETE("/nlp/record/drop", c0.DropNlpRecordByShopController)
	v1.DELETE("/nlp/record", c0.DeleteNlpRecordByIDController)
	v1.GET("/nlp/record/pagination", c0.ReadPaginationNlpRecordController)
	v1.GET("/nlp/record/reply", c0.ReadNlpReplyModelByShopController)
	v1.GET("/nlp/log/pagination", c6.ReadPaginationNlpTrainingLogController)
	v1.GET("/fb/webhook", c2.VerifyFBWebhookController)
	v1.POST("/fb/webhook", c2.ReplyFBWebhookController)
	v1.Any("/fb/webhook/socket.io", c2.ReplyFBWebhookSocketIO)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))

	defer e.Close()
	defer orm.DB.Close()
}
