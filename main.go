package main

import (
	"inc-nlp-service-echo/auth_module/security"
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/common_module/commons"
	"inc-nlp-service-echo/common_module/websockets"

	categorizeGateway "inc-nlp-service-echo/core_module/categorize/gateway"
	categorizeService "inc-nlp-service-echo/core_module/categorize/service"
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

	jwtConfig := security.NewJWTConfig("secret")
	secure0 := security.NewClientAuthSecurity("secret")

	// FIXME: move to nuxt js
	e.Use(staticMiddleware())
	ws := websockets.NewWebSocket()
	e.GET("/health_check", heathCheck)

	q := e.Group("/swagger")
	q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	v1 := e.Group("/v1")
	authGateway.NewHTTPGateway(v1, secure0)
	v1.Use(middleware.JWTWithConfig(jwtConfig))
	svc0 := shopService.NewService(repo6)
	svc1 := storyService.NewService(repo4)
	svc2 := nlpTraininglogService.NewService(repo0)
	svc3 := nlpService.NewService(repo1, repo0, repo3)
	svc4 := categorizeService.NewService(repo5, repo6)

	shopGateway.NewHTTPGateway(v1, svc0)
	storyGateway.NewHTTPGateway(v1, svc1)
	nlpTraininglogGateway.NewHTTPGateway(v1, svc2)
	nlpGateway.NewHTTPGateway(v1, svc3)
	fbGateway.NewHTTPGateway(v1, svc3)
	fbGateway.NewSocketGateway(v1, svc3, *ws.Upgrader)
	categorizeGateway.NewHTTPGateway(v1, svc4)

	// Start server
	e.Logger.Fatal(e.Start(":" + common0.EchoPort))

	defer e.Close()
	defer orm.DB.Close()
}

func staticMiddleware() echo.MiddlewareFunc {
	return middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "public",
		Browse: true,
		HTML5:  true,
	})
}

func heathCheck(c echo.Context) error {
	return c.String(http.StatusOK, "OK")
}
