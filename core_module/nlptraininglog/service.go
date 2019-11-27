package nlptraininglog

import "inc-nlp-service-echo/core_module/nlptraininglog/dao"

// Service INlpTrainingLogService
type Service interface {
	ReadPaginationNlpTrainingLogService(PageID string) dao.NlpTrainingLogPaginationSearchModel
	DeleteByID(ID string) (string, error)
	BulkDeleteByID(IDs []uint) (string, error)
}
