package facebook

import "github.com/labstack/echo/v4"

// HTTPGateway IFBWebhookController
type HTTPGateway interface {
	VerifyFBWebhookController(e echo.Context) error
	ReplyFBWebhookController(e echo.Context) error
	ReplyFBWebhookSocketIO(c echo.Context) error
}

type SocketGateway interface {
	ReplyFBWebhookSocketIO(c echo.Context) error
}
