package gateway

import (
	"inc-nlp-service-echo/core_module/categorize"
	"net/http"

	"github.com/labstack/echo/v4"
)

// HTTPGateway story rest api controller
type HTTPGateway struct {
	AppStoryService categorize.Service
}

// NewHTTPGateway new story controller instace
func NewHTTPGateway(e *echo.Group, svc0 categorize.Service) {
	handle := &HTTPGateway{svc0}

	e.POST("/app/story", handle.CreateRecord)
}

// CreateRecord CreateRecord
func (con HTTPGateway) CreateRecord(e echo.Context) error {
	appID := e.QueryParam("app_id")
	storyIDs := []string{"1", "2"}
	response := con.AppStoryService.CreateRecord(appID, storyIDs)
	return e.String(http.StatusOK, response)
}
