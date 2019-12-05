package gateway

import (
	"inc-nlp-service-echo/core_module/app"
	"net/http"

	"github.com/labstack/echo/v4"
)

// HTTPGateway app rest api controller
type HTTPGateway struct {
	AppService app.Service
}

// NewHTTPGateway new app controller instace
func NewHTTPGateway(e *echo.Group, svc0 app.Service) {
	handle := &HTTPGateway{svc0}

	e.GET("/app", handle.ReadAppByIDController)
}

// ReadAppByIDController ReadAppByIDController
func (h HTTPGateway) ReadAppByIDController(e echo.Context) error {
	appID := e.QueryParam("id")
	response := h.AppService.ReadAppByIDService(appID)
	return e.JSON(http.StatusOK, response)
}
