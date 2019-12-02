package nlpdashboard

import (
	"inc-nlp-service-echo/core_module/nlpdashboard/dao"

	"github.com/labstack/echo/v4"
)

// HTTPGateway nlp rest api interface
type HTTPGateway interface {
	ReadNlpLogging(e echo.Context) error
}

// Service INlpTrainingLogService
type Service interface {
	ReadNlpLogging(ID string) []dao.ReadLoggingDAO
}
