package nlp

import (
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	"github.com/labstack/echo/v4"
)

// HTTPGateway nlp rest api interface
type HTTPGateway interface {
	CreateRecord(e echo.Context) error
	UploadXlsx(e echo.Context) error
	DropAllRecord(e echo.Context) error
	SearchPagination(e echo.Context) error
	ReadNlpReply(e echo.Context) error
	DeleteByID(e echo.Context) error
	BulkDeleteByIDs(e echo.Context) error
	UpdateByIDAndClientID(e echo.Context) error
}

// Service Service
type Service interface {
	CreateRecord(createNlpRecordDao []dao.CreateNlpRecordDao) string
	UploadXlsx(xlsxSheet [][]string) string
	DropAllRecord() string
	SearchPagination(keyword string, intent string, story string, page string) dao.SearchPaginationDao
	ReadNlpReply(keyword string, appID string) dao.ReadNlpReplyDao
	DeleteByID(id string) string
	BulkDeleteByIDs(ids []string) (string, error)
	UpdateByIDAndClientID(updateNlpRecordDao dao.UpdateNlpRecordDao) string
}
