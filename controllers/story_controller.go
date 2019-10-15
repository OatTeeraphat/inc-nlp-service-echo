package controllers

import (
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/services"
	"net/http"

	"github.com/labstack/echo/v4"
)

// StoryController story rest api controller
type StoryController struct {
	StoryService services.IStoryService
}

// IStoryController story rest api interface
type IStoryController interface {
	ReadAllStoryRecordController(e echo.Context) error
	NewStoryRecordController(e echo.Context) error
}

// NewStoryController new story controller instace
func NewStoryController(svc0 services.IStoryService) IStoryController {
	return &StoryController{svc0}
}

// ReadAllStoryRecordController ReadAllStoryRecordController
func (con StoryController) ReadAllStoryRecordController(e echo.Context) error {
	response := con.StoryService.ReadAllStoryRecord()
	return e.JSON(http.StatusOK, response)
}

// NewStoryRecordController ReadAllStoryRecordController
func (con StoryController) NewStoryRecordController(e echo.Context) error {
	var body models.NewStoryModel
	e.Bind(&body)
	response := con.StoryService.NewStoryRecordService(body)
	return e.JSON(http.StatusOK, response)
}
