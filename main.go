package main

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/common_module/commons"
	"inc-nlp-service-echo/common_module/security"
	"inc-nlp-service-echo/common_module/websockets"

	categorizeGateway "inc-nlp-service-echo/core_module/categorize/gateway"
	categorizeService "inc-nlp-service-echo/core_module/categorize/service"
	nlpGateway "inc-nlp-service-echo/core_module/nlp/gateway"
	nlpService "inc-nlp-service-echo/core_module/nlp/service"
	nlpTraininglogGateway "inc-nlp-service-echo/core_module/nlptraininglog/gateway"
	nlpTraininglogService "inc-nlp-service-echo/core_module/nlptraininglog/service"
	shopGateway "inc-nlp-service-echo/core_module/shop/gateway"
	shopService "inc-nlp-service-echo/core_module/shop/service"
	storyGateway "inc-nlp-service-echo/core_module/story/gateway"
	storyService "inc-nlp-service-echo/core_module/story/service"

	// TODO: refractor fb, auth service
	// fbService "inc-nlp-service-echo/core_module/facebook/service"
	fbGateway "inc-nlp-service-echo/core_module/facebook/gateway"

	authGateway "inc-nlp-service-echo/core_module/authentication/gateway"

	"inc-nlp-service-echo/business_module/repositories"
	// "inc-nlp-service-echo/common_module/websockets"
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

	// ################# Security 🔑 #################
	jwtConfig := security.NewJWTConfig("secret")
	secure0 := security.NewClientAuthSecurity("secret")

	// c7 := authController.NewClientAuthController(secure0)

	e.GET("/health_check", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	// ################# Static 🕸 #################
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "public",
		Browse: true,
		HTML5:  true,
	}))

	// ################# Swagger ENDPOINT 📑 #################
	q := e.Group("/swagger")
	q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	v1 := e.Group("/v1")
	// ################# Non Restrict ENDPOINT 🦴 #################
	authGateway.NewHTTPGateway(v1, secure0)
	v1.Use(middleware.JWTWithConfig(jwtConfig))

	// ################# Restrict ENDPOINT With JWT 🔑 #################
	shopSvc := shopService.NewService(repo6)
	storySvc := storyService.NewService(repo4)
	nlpTrainingLogSvc := nlpTraininglogService.NewService(repo0)
	nlpSvc := nlpService.NewService(repo1, repo0, repo3)
	categorizeSvc := categorizeService.NewService(repo5, repo6)

	shopGateway.NewHTTPGateway(v1, shopSvc)
	storyGateway.NewHTTPGateway(v1, storySvc)
	nlpTraininglogGateway.NewHTTPGateway(v1, nlpTrainingLogSvc)
	nlpGateway.NewHTTPGateway(v1, nlpSvc)
	fbGateway.NewHTTPGateway(v1, nlpSvc, *ws.Upgrader)
	categorizeGateway.NewHTTPGateway(v1, categorizeSvc)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))

	defer e.Close()
	defer orm.DB.Close()
}
