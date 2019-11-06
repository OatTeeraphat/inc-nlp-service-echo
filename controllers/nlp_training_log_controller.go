package controllers

import (
	"inc-nlp-service-echo/services"
	"net/http"

	"github.com/labstack/echo/v4"
)

// NlpTrainingLogController nlp training log rest api controller
type NlpTrainingLogController struct {
	NlpTrainingLogService services.INlpTrainingLogService
}

// INlpTrainingLogController nlp rest api interface
type INlpTrainingLogController interface {
	// ReadNlpReplyModelByShopController(e echo.Context) error
	ReadPaginationNlpTrainingLogController(e echo.Context) error
	// DropNlpRecordByShopController(e echo.Context) error
}

// NewNlpTrainingLogController NewNlpTrainingLogController
func NewNlpTrainingLogController(svc0 services.INlpTrainingLogService) INlpTrainingLogController {
	return &NlpTrainingLogController{
		NlpTrainingLogService: svc0,
	}
}

// ReadPaginationNlpTrainingLogController ReadPaginationNlpTrainingLogController
func (service NlpTrainingLogController) ReadPaginationNlpTrainingLogController(e echo.Context) error {
	// intent := e.QueryParam("intent")
	// keyword := e.QueryParam("keyword")
	// story := e.QueryParam("story")
	page := e.QueryParam("page")

	response := service.NlpTrainingLogService.ReadPaginationNlpRecordService(page)

	return e.JSON(http.StatusOK, response)

}
