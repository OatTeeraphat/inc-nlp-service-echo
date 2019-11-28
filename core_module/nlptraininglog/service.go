package nlptraininglog

import "inc-nlp-service-echo/core_module/nlptraininglog/dao"

// Service INlpTrainingLogService
type Service interface {
	ReadPagination(Page string, keyword string) dao.SearchPaginationModel
	DeleteByID(ID string) (string, error)
	BulkDeleteByID(IDs []uint) (string, error)
}
