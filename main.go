package main

import (
	"inc-nlp-service-echo/auth_module/security"
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/common_module/commons"
	"inc-nlp-service-echo/kafka_module/consumer"
	"inc-nlp-service-echo/kafka_module/producer"

	appGateway "inc-nlp-service-echo/core_module/app/gateway"
	appService "inc-nlp-service-echo/core_module/app/service"
	categorizeGateway "inc-nlp-service-echo/core_module/categorize/gateway"
	categorizeService "inc-nlp-service-echo/core_module/categorize/service"
	nlpDashboardGateway "inc-nlp-service-echo/core_module/nlpdashboard/gateway"
	nlpDashboardService "inc-nlp-service-echo/core_module/nlpdashboard/service"
	"inc-nlp-service-echo/core_module/nlprecord/dao"
	nlpRecordGateway "inc-nlp-service-echo/core_module/nlprecord/gateway"
	nlpRecordService "inc-nlp-service-echo/core_module/nlprecord/service"
	nlpTraininglogGateway "inc-nlp-service-echo/core_module/nlptraininglog/gateway"
	nlpTraininglogService "inc-nlp-service-echo/core_module/nlptraininglog/service"
	storyGateway "inc-nlp-service-echo/core_module/story/gateway"
	storyService "inc-nlp-service-echo/core_module/story/service"

	// TODO: refractor fb, auth service
	fbGateway "inc-nlp-service-echo/core_module/facebook/gateway"

	authGateway "inc-nlp-service-echo/core_module/authentication/gateway"
	clientGateway "inc-nlp-service-echo/core_module/client/gateway"

	"inc-nlp-service-echo/business_module/repositories"
	"net/http"
	"os"

	// TODO: completet swagger
	// _ "inc-nlp-service-echo/docs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	log "github.com/sirupsen/logrus"
	echoSwagger "github.com/swaggo/echo-swagger"
)

type HealthCheck struct {
	KafaProducer *producer.Producer
}

func NewHealthCheck(kafkaProducer *producer.Producer) *HealthCheck {
	return &HealthCheck{
		KafaProducer: kafkaProducer,
	}
}

func (h HealthCheck) HeathCheck(c echo.Context) error {

	data := dao.ReadNlpReplyDao{}
	data.Keyword = "PING"
	data.Intent = "PING"
	data.Distance = 0
	data.StoryID = "PING"

	h.KafaProducer.ProduceNlpLoggingMessage(data)

	return c.String(http.StatusOK, "PONG")
}

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
	selectENV := commons.NewSelectENV()
	// selectMiddleware := commons.NewMiddleware()

	log.SetFormatter(&log.TextFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)

	e := echo.New()
	// event0 := eventbus.NewEventBus(0, "nlp.dashboard.logging")
	consumer0 := consumer.NewKafkaConsumer(selectENV, "nlp.dashboard.logging", "groupid")
	producer0 := producer.NewKafkaProducer(selectENV, "nlp.dashboard.logging")

	e.Use(
		middleware.Logger(),
		middleware.Recover(),
		middleware.RequestID(),
		middleware.Gzip(),
	)

	orm := datasources.NewGORM(selectENV)

	orm.DB.LogMode(selectENV.IsGORMLogging)

	repo0 := repositories.NewNlpTrainingLogRepository(orm)
	repo1 := repositories.NewNlpRecordRepository(orm)
	repo3 := repositories.NewAppStoryRepository(orm)
	repo4 := repositories.NewStoryRepository(orm)
	repo5 := repositories.NewAppStoryRepository(orm)
	repo6 := repositories.NewAppRepository(orm)
	repo7 := repositories.NewNlpDashboardRepository(orm)
	// repo8 := repositories.NewClientRepository(orm)

	// jwtConfig := security.NewJWTConfig("secret")
	secure0 := security.NewClientAuthSecurity("secret")

	svc0 := appService.NewService(repo6)
	svc1 := storyService.NewService(repo4)
	svc2 := nlpTraininglogService.NewService(repo1, repo0)
	svc3 := nlpRecordService.NewService(repo1, repo0, repo3, repo7)
	svc4 := categorizeService.NewService(repo5, repo6)
	svc5 := nlpDashboardService.NewService(repo7)

	// FIXME: move to nuxt js
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "public",
		Browse: true,
		HTML5:  true,
	}))

	healthCheck := NewHealthCheck(producer0)

	e.GET("/health_check", healthCheck.HeathCheck)

	q := e.Group("/swagger")
	// q.Use(middleware.BasicAuth(common1.StaffAuthMiddleware))
	q.GET("/*", echoSwagger.WrapHandler)

	api := e.Group("/v1")
	authGateway.NewHTTPGateway(api, secure0)
	// api.Use(middleware.JWTWithConfig(jwtConfig))

	appGateway.NewHTTPGateway(api, svc0)
	storyGateway.NewHTTPGateway(api, svc1)
	nlpTraininglogGateway.NewHTTPGateway(api, svc2)
	nlpRecordGateway.NewHTTPGateway(api, svc3, producer0)
	fbGateway.NewHTTPGateway(api, svc3)
	categorizeGateway.NewHTTPGateway(api, svc4)
	nlpDashboardGateway.NewHTTPGateway(api, svc5)
	clientGateway.NewHTTPGateway(api)
	nlpDashboardGateway.NewWebSocketGateway(api)

	go consumer0.ConsumeNlpLoggingMessage()

	// Start server
	e.Logger.Fatal(e.Start(":" + selectENV.EchoPort))

	defer e.Close()
	defer orm.DB.Close()
	defer producer0.Close()
	defer consumer0.Close()

}
