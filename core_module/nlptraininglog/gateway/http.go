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
	e.DELETE("/nlp/log", handle.DeleteByID)
	e.DELETE("/nlp/log/bulk", handle.BulkDeleteByID)
}

// ReadPaginationNlpTrainingLogController ReadPaginationNlpTrainingLogController
func (h HTTPGateway) ReadPaginationNlpTrainingLogController(e echo.Context) error {
	// intent := e.QueryParam("intent")
	// keyword := e.QueryParam("keyword")
	// story := e.QueryParam("story")
	page := e.QueryParam("page")

	response := h.NlpTrainingLogService.ReadPaginationNlpTrainingLogService(page)

	return e.JSON(http.StatusOK, response)

}

// DeleteByID DeleteByID
func (h HTTPGateway) DeleteByID(e echo.Context) error {
	ID := e.QueryParam("id")

	response, error := h.NlpTrainingLogService.DeleteByID(ID)
	if error != nil {
		return e.String(http.StatusUnprocessableEntity, "INVALID")
	}
	return e.String(http.StatusOK, response)
}

// BulkDeleteByID BulkDeleteByID
func (h HTTPGateway) BulkDeleteByID(e echo.Context) error {
	ids := new([]uint)
	e.Bind(&ids)

	response, error := h.NlpTrainingLogService.BulkDeleteByID(*ids)

	if error != nil {
		return e.String(http.StatusUnprocessableEntity, "INVALID")
	}

	return e.String(http.StatusOK, response)
}
