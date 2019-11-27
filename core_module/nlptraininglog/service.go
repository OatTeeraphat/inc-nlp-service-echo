package nlptraininglog

import "inc-nlp-service-echo/core_module/nlptraininglog/dao"

// Service INlpTrainingLogService
type Service interface {
	ReadPaginationNlpRecordService(PageID string) dao.NlpTrainingLogPaginationSearchModel
}
