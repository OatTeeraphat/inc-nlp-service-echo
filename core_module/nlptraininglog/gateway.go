package nlptraininglog

import "github.com/labstack/echo/v4"

// HTTPGateway nlp rest api interface
type HTTPGateway interface {
	// ReadNlpReplyModelByShopController(e echo.Context) error
	ReadPaginationNlpTrainingLogController(e echo.Context) error
	DeleteByID(e echo.Context) error
	BulkDeleteByID(e echo.Context) error
}
