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

var (
	// Websocket http upgrader
	upgrader = websocket.Upgrader{
		ReadBufferSize:    1024,
		WriteBufferSize:   1024,
		EnableCompression: true,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
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

	log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
	log.SetReportCaller(true)

	// log.WithFields(log.Fields{
	// 	"step":   1,
	// 	"module": "NLP_MODULE",
	// }).Info("find minimum distance")

	// OS ENV configuration
	config := commons.NewFillChatSelectENV()

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

	e.GET("/v1/fb/webhook/socket.io", func(c echo.Context) error {
		ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
		if err != nil {
			return err
		}
		defer ws.Close()

		for {

			// Read
			_, msg, err := ws.ReadMessage()
			if err != nil {
				log.Error(err)
			}
			// fmt.Printf("%s\n", msg)

			nlpResult := nlpRecordService.ReadNlpReplyModel(string(msg), "1")

			// Write
			errWrite := ws.WriteMessage(websocket.TextMessage, []byte(nlpResult.Intent))
			if errWrite != nil {
				log.Error(errWrite)
			}
		}
	})

	// Swagger
	if config.IsSwagger == "true" {
		e.GET("/swagger/*", echoSwagger.WrapHandler)
	}

	// Start server
	e.Logger.Fatal(e.Start(":" + config.EchoPort))
}
