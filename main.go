package main

import (
	"inc-nlp-service-echo/commons"
	"inc-nlp-service-echo/controllers"
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/repositories"
	"inc-nlp-service-echo/services"
	"net/http"
	"os"

	// docs folder to server swagger
	_ "inc-nlp-service-echo/docs"

	"github.com/gorilla/websocket"
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
	log.SetFormatter(&log.TextFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
	log.SetReportCaller(true)

	// Configuration
	common0 := commons.NewFillChatSelectENV()
	common1 := commons.NewFillChatMiddleware()

	// Websocket http upgrader
	ws := websocket.Upgrader{
		ReadBufferSize:    1024,
		WriteBufferSize:   1024,
		EnableCompression: true,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	// Echo instance
	e := echo.New()

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

	// Services
	svc0 := services.NewNlpRecordService(repo1, repo0)

	// Controllers
	c0 := controllers.NewNlpController(svc0)
	c2 := controllers.NewFBWebhookController(svc0, ws)

	// Static
	e.Static("/", "public")

	// Swagger
	q := e.Group("/swagger")
	q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	// Routes
	e.POST("/v1/nlp/record", c0.CreateNlpRecordByShopController)
	e.POST("/v1/nlp/record/upload.xlsx", c0.UploadXlsxNlpRecordByShopController)
	e.DELETE("/v1/nlp/record", c0.DropNlpRecordByShopController)
	e.GET("/v1/nlp/record", c0.ReadNlpRecordByShopController)
	e.GET("/v1/nlp/record/reply", c0.ReadNlpReplyModelByShopController)
	e.GET("/v1/fb/webhook", c2.VerifyFBWebhookController)
	e.POST("/v1/fb/webhook", c2.ReplyFBWebhookController)
	e.GET("/v1/fb/webhook/socket.io", c2.ReplyFBWebhookSocketIO)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))
}
