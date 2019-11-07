package repositories

import (
	"inc-nlp-service-echo/domains"

	"github.com/jinzhu/gorm"
)

// NlpTrainingLogRepository nlp query appearance
type NlpTrainingLogRepository struct {
	Datasources *gorm.DB
}

// INlpTrainingLogRepository nlp query appearance interface
type INlpTrainingLogRepository interface {
	Save(nlpTrainingRecordDomain *domains.NlpTrainingLogDomain)
	Count() int64
	Pagination(PageIndex int, Limit int) []domains.NlpTrainingLogDomain
}

// NewNlpTrainingLogRepository new nlp record instance
func NewNlpTrainingLogRepository(data *gorm.DB) INlpTrainingLogRepository {
	return &NlpTrainingLogRepository{data}
}

// Save create new nlp record domain
func (repo *NlpTrainingLogRepository) Save(nlpTrainingRecordDomain *domains.NlpTrainingLogDomain) {
	repo.Datasources.Create(&nlpTrainingRecordDomain)
}

// Count Count
func (repo *NlpTrainingLogRepository) Count() int64 {
	var totalPage int64
	repo.Datasources.Table("nlp_dashboards").Count(&totalPage)
	return totalPage
}

// Pagination Pagination
func (repo NlpTrainingLogRepository) Pagination(PageIndex int, Limit int) []domains.NlpTrainingLogDomain {
	var nlpTrainingLogDomain []domains.NlpTrainingLogDomain
	repo.Datasources.Limit(Limit).Find(&nlpTrainingLogDomain).Offset(Limit * (PageIndex - 1)).Order("id asc").Find(&nlpTrainingLogDomain)
	return nlpTrainingLogDomain
}
