package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
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
	DeleteByID(ID uint) *gorm.DB
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

// DeleteByID DeleteByID
func (r NlpTrainingLogRepository) DeleteByID(ID uint) *gorm.DB {
	domain := &domains.NlpTrainingLogDomain{}
	domain.ID = ID
	return r.DB.Unscoped().Delete(domain)
}
