package authentication

import "github.com/labstack/echo/v4"

// HTTPGateway IClientAuthController
type HTTPGateway interface {
	ClientLoginController(c echo.Context) error
}
