package main

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/common_module/commons"
	"inc-nlp-service-echo/common_module/security"

	shopGateway "inc-nlp-service-echo/core_module/shop/gateway"
	shopService "inc-nlp-service-echo/core_module/shop/service"
	storyGateway "inc-nlp-service-echo/core_module/story/gateway"
	storyService "inc-nlp-service-echo/core_module/story/service"

	authController "inc-nlp-service-echo/core_module/authentication/controller"
	shopStoryController "inc-nlp-service-echo/core_module/categorize/controller"
	shopStoryService "inc-nlp-service-echo/core_module/categorize/service"
	facebookController "inc-nlp-service-echo/core_module/facebook/controller"
	nlpController "inc-nlp-service-echo/core_module/nlp/controller"
	nlpService "inc-nlp-service-echo/core_module/nlp/service"

	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/common_module/websockets"
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
		// middleware.Gzip(),
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
	svc0 := nlpService.NewNlpRecordService(repo1, repo0, repo3)
	svc4 := nlpService.NewNlpTrainingLogService(repo0)

	svc2 := shopStoryService.NewShopStoryService(repo5, repo6)

	// ################# Security 🔑 #################
	jwtConfig := security.NewJWTConfig("secret")
	secure0 := security.NewClientAuthSecurity("secret")

	// ################# Controllers 🎮 #################
	c0 := nlpController.NewNlpController(svc0)
	c6 := nlpController.NewNlpTrainingLogController(svc4)
	// c3 := storyController.NewStoryController(svc1)

	c4 := shopStoryController.NewShopStoryController(svc2)

	c2 := facebookController.NewFBWebhookController(svc0, *ws.Upgrader)
	c7 := authController.NewClientAuthController(secure0)

	e.GET("/health_check", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	// ################# Static 🕸 #################
	// e.Static("/", "public")

	// e.File("/", "public/index.html")

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

	svc3 := shopService.NewService(repo6)
	c5 := shopGateway.NewHTTPGateway(svc3)

	// TODO: fix import type
	svc1 := storyService.NewService(repo4)
	storyGateway.NewHTTPGateway(v1, svc1)

	v1.GET("/shop", c5.ReadShopByIDController)
	v1.POST("/shop/story", c4.CreateShopStoryController)

	v1.POST("/nlp/record", c0.CreateNlpRecordByShopController)
	v1.POST("/nlp/record/upload.xlsx", c0.UploadXlsxNlpRecordByShopController)
	v1.DELETE("/nlp/record/drop", c0.DropNlpRecordByShopController)
	v1.DELETE("/nlp/record", c0.DeleteNlpRecordByIDController)
	v1.DELETE("/nlp/record/bulk", c0.BulkDeleteNlpRecordByIDsController)
	v1.GET("/nlp/record/pagination", c0.ReadPaginationNlpRecordController)
	v1.GET("/nlp/record/reply", c0.ReadNlpReplyModelByShopController)
	v1.PUT("/nlp/record", c0.UpdateNlpRecordByIDController)

	v1.GET("/nlp/log/pagination", c6.ReadPaginationNlpTrainingLogController)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))

	defer e.Close()
	defer orm.DB.Close()
}
