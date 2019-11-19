package repositories

import (
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/domains"
)

// NlpTrainingLogRepository nlp query appearance
type NlpTrainingLogRepository struct {
	*datasources.FillChatGORM
}

// INlpTrainingLogRepository nlp query appearance interface
type INlpTrainingLogRepository interface {
	Save(nlpTrainingRecordDomain *domains.NlpTrainingLogDomain)
	Count() int64
	Pagination(PageIndex int, Limit int) []domains.NlpTrainingLogDomain
}

// NewNlpTrainingLogRepository new nlp record instance
func NewNlpTrainingLogRepository(data *datasources.FillChatGORM) INlpTrainingLogRepository {
	return &NlpTrainingLogRepository{data}
}

// Save create new nlp record domain
func (repo *NlpTrainingLogRepository) Save(nlpTrainingRecordDomain *domains.NlpTrainingLogDomain) {
	repo.DB.Create(&nlpTrainingRecordDomain)
}

// Count Count
func (repo *NlpTrainingLogRepository) Count() int64 {
	var totalPage int64
	repo.DB.Table("nlp_training_logs").Count(&totalPage)
	return totalPage
}

// Pagination Pagination
func (repo NlpTrainingLogRepository) Pagination(PageIndex int, Limit int) []domains.NlpTrainingLogDomain {
	var nlpTrainingLogDomain []domains.NlpTrainingLogDomain
	repo.DB.Limit(Limit).Find(&nlpTrainingLogDomain).Offset(Limit * (PageIndex - 1)).Order("id asc").Find(&nlpTrainingLogDomain)
	return nlpTrainingLogDomain
}
