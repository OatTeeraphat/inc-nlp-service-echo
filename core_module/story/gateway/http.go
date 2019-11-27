package gateway

import (
	"inc-nlp-service-echo/core_module/story"
	"inc-nlp-service-echo/core_module/story/dao"
	"net/http"

	"github.com/labstack/echo/v4"
)

// HTTPGateway story rest api controller
type HTTPGateway struct {
	storyService story.Service
}

// NewHTTPGateway new story controller instace
func NewHTTPGateway(e *echo.Group, storyService story.Service) {
	handle := &HTTPGateway{
		storyService: storyService,
	}

	e.GET("/story", handle.ReadAllStoryRecordController)
	e.POST("/story", handle.NewStoryRecordController)
	e.DELETE("/story", handle.DeleteStoryByIDController)

}

// ReadAllStoryRecordController ReadAllStoryRecordController
func (h HTTPGateway) ReadAllStoryRecordController(e echo.Context) error {
	response := h.storyService.ReadAllStoryRecordService()
	return e.JSON(http.StatusOK, response)
}

// NewStoryRecordController ReadAllStoryRecordController
func (h HTTPGateway) NewStoryRecordController(e echo.Context) error {
	var body dao.NewStoryModel
	e.Bind(&body)
	response := h.storyService.NewStoryRecordService(body)
	return e.String(http.StatusOK, response)
}

// DeleteStoryByIDController DeleteStoryByIDController
func (h HTTPGateway) DeleteStoryByIDController(e echo.Context) error {
	storyID := e.QueryParam("id")
	response := h.storyService.DeleteStoryByIDService(storyID)
	return e.String(http.StatusOK, response)
}
