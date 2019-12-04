package main

import (
	"inc-nlp-service-echo/auth_module/security"
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/common_module/commons"

	categorizeGateway "inc-nlp-service-echo/core_module/categorize/gateway"
	categorizeService "inc-nlp-service-echo/core_module/categorize/service"
	nlpDashboardGateway "inc-nlp-service-echo/core_module/nlpdashboard/gateway"
	nlpDashboardService "inc-nlp-service-echo/core_module/nlpdashboard/service"
	nlpGateway "inc-nlp-service-echo/core_module/nlprecord/gateway"
	nlpService "inc-nlp-service-echo/core_module/nlprecord/service"
	nlpTraininglogGateway "inc-nlp-service-echo/core_module/nlptraininglog/gateway"
	nlpTraininglogService "inc-nlp-service-echo/core_module/nlptraininglog/service"
	shopGateway "inc-nlp-service-echo/core_module/shop/gateway"
	shopService "inc-nlp-service-echo/core_module/shop/service"
	storyGateway "inc-nlp-service-echo/core_module/story/gateway"
	storyService "inc-nlp-service-echo/core_module/story/service"

	// TODO: refractor fb, auth service
	fbGateway "inc-nlp-service-echo/core_module/facebook/gateway"

	authGateway "inc-nlp-service-echo/core_module/authentication/gateway"

	"inc-nlp-service-echo/business_module/repositories"
	"net/http"
	"os"

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

	log.SetFormatter(&log.TextFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)

	e := echo.New()

	e.Use(
		middleware.Logger(),
		middleware.Recover(),
		middleware.RequestID(),
		middleware.Gzip(),
	)

	orm := datasources.NewFillChatGORM(common0)
	orm.DB.LogMode(false)

	repo0 := repositories.NewNlpTrainingLogRepository(orm)
	repo1 := repositories.NewNlpRecordRepository(orm)
	repo3 := repositories.NewShopStoryRepository(orm)
	repo4 := repositories.NewStoryRepository(orm)
	repo5 := repositories.NewShopStoryRepository(orm)
	repo6 := repositories.NewShopRepository(orm)
	repo7 := repositories.NewNlpDashboardRepository(orm)

	jwtConfig := security.NewJWTConfig("secret")
	secure0 := security.NewClientAuthSecurity("secret")

	svc0 := shopService.NewService(repo6)
	svc1 := storyService.NewService(repo4)
	svc2 := nlpTraininglogService.NewService(repo0)
	svc3 := nlpService.NewService(repo1, repo0, repo3, repo7)
	svc4 := categorizeService.NewService(repo5, repo6)
	svc5 := nlpDashboardService.NewService(repo7)

	// FIXME: move to nuxt js
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "public",
		Browse: true,
		HTML5:  true,
	}))

	e.GET("/health_check", heathCheck)

	q := e.Group("/swagger")
	q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	api := e.Group("/v1")
	authGateway.NewHTTPGateway(api, secure0)
	nlpDashboardGateway.NewWebSocket(api)

	api.Use(middleware.JWTWithConfig(jwtConfig))

	shopGateway.NewHTTPGateway(api, svc0)
	storyGateway.NewHTTPGateway(api, svc1)
	nlpTraininglogGateway.NewHTTPGateway(api, svc2)
	nlpGateway.NewHTTPGateway(api, svc3)
	fbGateway.NewHTTPGateway(api, svc3)
	categorizeGateway.NewHTTPGateway(api, svc4)
	nlpDashboardGateway.NewHTTPGateway(api, svc5)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))

	defer e.Close()
	defer orm.DB.Close()
}

func heathCheck(c echo.Context) error {
	return c.String(http.StatusOK, "PONG")
}
