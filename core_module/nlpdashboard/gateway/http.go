package gateway

import (
	"inc-nlp-service-echo/core_module/nlpdashboard"
	"net/http"

	"github.com/labstack/echo/v4"
)

// HTTPGateway HTTPGateway
type HTTPGateway struct {
	NlpDashboardService nlpdashboard.Service
}

// NewHTTPGateway new nlp controller instace
func NewHTTPGateway(e *echo.Group, dashboardService nlpdashboard.Service) {
	handle := &HTTPGateway{dashboardService}

	e.GET("/nlp/dashboard/gte", handle.ReadNlpLogging)
}

// ReadNlpLogging ReadNlpLogging
func (h *HTTPGateway) ReadNlpLogging(e echo.Context) error {
	ID := e.QueryParam("id")
	responseEntity := h.NlpDashboardService.ReadNlpLogging(ID)

	return e.JSON(http.StatusOK, responseEntity)
}
