package gateway

import (
	"inc-nlp-service-echo/core_module/nlpdashboard"
	"net/http"

	"github.com/labstack/echo"
)

// HTTPGateway HTTPGateway
type HTTPGateway struct {
	NlpDashboardService nlpdashboard.Service
}

// NewHTTPGateway new nlp controller instace
func NewHTTPGateway(e *echo.Group, dashboardService nlpdashboard.Service) {
	handle := &HTTPGateway{dashboardService}

	e.Any("/", handle.Mock)
}

// Mock Mock
func (h *HTTPGateway) Mock(e echo.Context) error {
	return e.String(http.StatusOK, "OK")
}
