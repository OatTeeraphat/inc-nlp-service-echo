package shop

import "github.com/labstack/echo/v4"

// HTTPGateway shop rest api interface
type HTTPGateway interface {
	ReadShopByIDController(e echo.Context) error
}

// Service IShopService
type Service interface {
	ReadShopByIDService(ID string) string
}
