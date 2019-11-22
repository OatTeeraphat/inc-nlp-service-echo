package main

import (
	"inc-nlp-service-echo/commons"
	"inc-nlp-service-echo/controllers"
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/repositories"
	"inc-nlp-service-echo/security"
	"inc-nlp-service-echo/services"
	"inc-nlp-service-echo/websockets"
	"net/http"
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

	// if common0.Env != "development" {
	// 	log.SetFormatter(&log.JSONFormatter{})
	// } else {
	log.SetFormatter(&log.TextFormatter{})
	// }
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)

	e := echo.New()
	ws := websockets.NewWebSocket()

	// ################# Middleware #################
	e.Use(
		middleware.Logger(),
		middleware.Recover(),
		middleware.RequestID(),
		middleware.Gzip(),
	)

	// ################# Sync GORM 📦 #################
	orm := datasources.NewFillChatGORM(common0)
	orm.DB.LogMode(false)

	// ################# Repositories 🏦 #################
	repo0 := repositories.NewNlpTrainingLogRepository(orm)
	repo1 := repositories.NewNlpRecordRepository(orm)
	repo3 := repositories.NewShopStoryRepository(orm)
	repo4 := repositories.NewStoryRepository(orm)
	repo5 := repositories.NewShopStoryRepository(orm)
	repo6 := repositories.NewShopRepository(orm)

	// ################# Services 💰 #################
	svc0 := services.NewNlpRecordService(repo1, repo0, repo3)
	svc1 := services.NewStoryService(repo4)
	svc2 := services.NewShopStoryService(repo5, repo6)
	svc3 := services.NewShopService(repo6)
	svc4 := services.NewNlpTrainingLogService(repo0)

	// ################# Security 🔑 #################
	jwtConfig := security.NewJWTConfig("secret")
	secure0 := security.NewClientAuthSecurity("secret")

	// ################# Controllers 🎮 #################
	c0 := controllers.NewNlpController(svc0)
	c2 := controllers.NewFBWebhookController(svc0, *ws.Upgrader)
	c3 := controllers.NewStoryController(svc1)
	c4 := controllers.NewShopStoryController(svc2)
	c5 := controllers.NewShopController(svc3)
	c6 := controllers.NewNlpTrainingLogController(svc4)
	c7 := controllers.NewClientAuthController(secure0)

	e.GET("/health_check", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	// ################# Static 🕸 #################
	e.Static("/", "public")
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "public",
		Browse: true,
		HTML5:  true,
	}))

	// ################# Swagger ENDPOINT 📑 #################
	q := e.Group("/swagger")
	q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	// ################# Non Restrict ENDPOINT 🦴 #################
	v0 := e.Group("/v1")
	v0.POST("/login", c7.ClientLoginController)

	v0.GET("/fb/webhook", c2.VerifyFBWebhookController)
	v0.POST("/fb/webhook", c2.ReplyFBWebhookController)
	v0.Any("/fb/webhook/socket.io", c2.ReplyFBWebhookSocketIO)

	// ################# Restrict ENDPOINT With JWT 🔑 #################
	v1 := e.Group("/v1")
	v1.Use(middleware.JWTWithConfig(jwtConfig))

	v1.GET("/story", c3.ReadAllStoryRecordController)
	v1.POST("/story", c3.NewStoryRecordController)
	v1.DELETE("/story", c3.DeleteStoryByIDController)

	v1.GET("/shop", c5.ReadShopByIDController)
	v1.POST("/shop/story", c4.CreateShopStoryController)

	v1.POST("/nlp/record", c0.CreateNlpRecordByShopController)
	v1.POST("/nlp/record/upload.xlsx", c0.UploadXlsxNlpRecordByShopController)
	v1.DELETE("/nlp/record/drop", c0.DropNlpRecordByShopController)
	v1.DELETE("/nlp/record", c0.DeleteNlpRecordByIDController)
	v1.DELETE("/nlp/record/bulk", c0.BulkDeleteNlpRecordByIDsController)
	v1.GET("/nlp/record/pagination", c0.ReadPaginationNlpRecordController)
	v1.GET("/nlp/record/reply", c0.ReadNlpReplyModelByShopController)
	v1.GET("/nlp/log/pagination", c6.ReadPaginationNlpTrainingLogController)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))

	defer e.Close()
	defer orm.DB.Close()
}
