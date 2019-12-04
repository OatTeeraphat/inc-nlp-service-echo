package app

import "github.com/labstack/echo/v4"

// HTTPGateway app rest api interface
type HTTPGateway interface {
	ReadAppByIDController(e echo.Context) error
}

// Service IAppService
type Service interface {
	ReadAppByIDService(ID string) string
}
