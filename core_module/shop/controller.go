package shop

import "github.com/labstack/echo/v4"

// IShopController shop rest api interface
type IShopController interface {
	ReadShopByIDController(e echo.Context) error
}
