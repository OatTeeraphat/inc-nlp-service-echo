package nlp

import "inc-nlp-service-echo/core_module/nlp/dao"

// INlpRecordService INlpService
type INlpRecordService interface {
	UploadXlsxNlpRecordService(xlsxSheet [][]string) string
	DropNlpReplyByShopService() string
	ReadPaginationNlpRecordService(keyword string, intent string, story string, page string) dao.NlpRecordPaginationSearchModel
	ReadNlpReplyModelService(keyword string, shopID string) dao.NlpReplyModel
	CreateNlpRecordService(createNlpModel []dao.CreateNlpRecordModel) string
	RemoveNlpRecordByID(id string) string
	BulkDeleteNlpRecordByIDs(ids []uint) (string, error)
	UpdateNlpRecordByIDAndClientID(id string) string
}

// INlpTrainingLogService INlpTrainingLogService
type INlpTrainingLogService interface {
	ReadPaginationNlpRecordService(PageID string) dao.NlpTrainingLogPaginationSearchModel
}
