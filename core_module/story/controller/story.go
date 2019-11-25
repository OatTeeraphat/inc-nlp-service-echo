package controller

import (
	"inc-nlp-service-echo/core_module/story"
	"inc-nlp-service-echo/core_module/story/dao"
	"net/http"

	"github.com/labstack/echo/v4"
)

// StoryController story rest api controller
type StoryController struct {
	StoryService story.IStoryService
}

// NewStoryController new story controller instace
func NewStoryController(svc0 story.IStoryService) story.IStoryController {
	return &StoryController{svc0}
}

// ReadAllStoryRecordController ReadAllStoryRecordController
func (con StoryController) ReadAllStoryRecordController(e echo.Context) error {
	response := con.StoryService.ReadAllStoryRecordService()
	return e.JSON(http.StatusOK, response)
}

// NewStoryRecordController ReadAllStoryRecordController
func (con StoryController) NewStoryRecordController(e echo.Context) error {
	var body dao.NewStoryModel
	e.Bind(&body)
	response := con.StoryService.NewStoryRecordService(body)
	return e.String(http.StatusOK, response)
}

// DeleteStoryByIDController DeleteStoryByIDController
func (con StoryController) DeleteStoryByIDController(e echo.Context) error {
	storyID := e.QueryParam("id")
	response := con.StoryService.DeleteStoryByIDService(storyID)
	return e.String(http.StatusOK, response)
}
