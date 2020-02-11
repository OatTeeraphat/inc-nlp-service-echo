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

	e.GET("/story", handle.ReadAll)
	e.POST("/story", handle.CreateOneStory)
	e.PUT("/story", handle.UpdateOneByID)
	e.DELETE("/story", handle.DeleteByID)

}

// ReadAll ReadAll
func (h HTTPGateway) ReadAll(e echo.Context) error {
	response := h.storyService.ReadAll()
	return e.JSON(http.StatusOK, response)
}

// UpdateOneByID UpdateOneByID
func (h HTTPGateway) UpdateOneByID(e echo.Context) error {
	storyID := e.QueryParam("id")
	response := h.storyService.UpdateOneByID(storyID)
	return e.String(http.StatusOK, response)
}

// CreateOneStory CreateOneStory
func (h HTTPGateway) CreateOneStory(e echo.Context) error {
	var newStoryDao dao.NewStoryDao
	e.Bind(&newStoryDao)
	response := h.storyService.CreateOneStory(newStoryDao)
	return e.String(http.StatusOK, response)
}

// DeleteByID DeleteByID
func (h HTTPGateway) DeleteByID(e echo.Context) error {
	storyID := e.QueryParam("id")
	response := h.storyService.DeleteByID(storyID)
	return e.String(http.StatusOK, response)
}
