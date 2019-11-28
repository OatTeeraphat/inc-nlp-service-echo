package nlptraininglog

import (
	"inc-nlp-service-echo/core_module/nlptraininglog/dao"

	"github.com/labstack/echo/v4"
)

// HTTPGateway nlp rest api interface
type HTTPGateway interface {
	SearchPagination(e echo.Context) error
	DeleteByID(e echo.Context) error
	BulkDeleteByID(e echo.Context) error
}

// Service INlpTrainingLogService
type Service interface {
	SearchPagination(Page string, keyword string) dao.SearchPaginationModel
	DeleteByID(ID string) (string, error)
	BulkDeleteByID(IDs dao.BulkDeleteByIDsDao) (string, error)
}
