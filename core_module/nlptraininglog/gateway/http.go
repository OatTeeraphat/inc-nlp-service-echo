package controller

import (
	"inc-nlp-service-echo/core_module/nlptraininglog"
	"net/http"

	"github.com/labstack/echo/v4"
)

// HTTPGateway nlp training log rest api controller
type HTTPGateway struct {
	NlpTrainingLogService nlptraininglog.Service
}

// NewHTTPGateway NewHTTPGateway
func NewHTTPGateway(e *echo.Group, svc0 nlptraininglog.Service) {
	handle := &HTTPGateway{
		NlpTrainingLogService: svc0,
	}

	e.GET("/nlp/log/pagination", handle.ReadPaginationNlpTrainingLogController)
}

// ReadPaginationNlpTrainingLogController ReadPaginationNlpTrainingLogController
func (service HTTPGateway) ReadPaginationNlpTrainingLogController(e echo.Context) error {
	// intent := e.QueryParam("intent")
	// keyword := e.QueryParam("keyword")
	// story := e.QueryParam("story")
	page := e.QueryParam("page")

	response := service.NlpTrainingLogService.ReadPaginationNlpRecordService(page)

	return e.JSON(http.StatusOK, response)

}
