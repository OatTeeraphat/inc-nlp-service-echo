package shop

import "github.com/labstack/echo/v4"

// IShopController shop rest api interface
type HTTPGateway interface {
	ReadShopByIDController(e echo.Context) error
}
