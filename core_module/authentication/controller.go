package authentication

import "github.com/labstack/echo/v4"

// IClientAuthController IClientAuthController
type IClientAuthController interface {
	ClientLoginController(c echo.Context) error
}
