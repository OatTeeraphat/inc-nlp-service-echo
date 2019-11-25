package facebook

import "github.com/labstack/echo/v4"

// IFBWebhookController IFBWebhookController
type IFBWebhookController interface {
	VerifyFBWebhookController(e echo.Context) error
	ReplyFBWebhookController(e echo.Context) error
	ReplyFBWebhookSocketIO(c echo.Context) error
}
