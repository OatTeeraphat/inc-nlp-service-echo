package controller

import (
	"inc-nlp-service-echo/core_module/nlp"
	"net/http"

	"github.com/labstack/echo/v4"
)

// NlpTrainingLogController nlp training log rest api controller
type NlpTrainingLogController struct {
	NlpTrainingLogService nlp.INlpTrainingLogService
}

// NewNlpTrainingLogController NewNlpTrainingLogController
func NewNlpTrainingLogController(svc0 nlp.INlpTrainingLogService) nlp.INlpTrainingLogController {
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
