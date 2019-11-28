package nlpdashboard

import (
	"github.com/labstack/echo/v4"
)

// HTTPGateway nlp rest api interface
type HTTPGateway interface {
	Mock(e echo.Context) error
}

// Service INlpTrainingLogService
type Service interface {
	Mock() error
}
