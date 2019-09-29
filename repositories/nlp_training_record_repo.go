package repositories

import (
	"inc-nlp-service-echo/domains"

	"github.com/jinzhu/gorm"
)

// NlpRecordTrainingRepository nlp query appearance
type NlpRecordTrainingRepository struct {
	Datasources *gorm.DB
}

// INlpRecordTrainingRepository nlp query appearance interface
type INlpRecordTrainingRepository interface {
	Save(nlpTrainingRecordDomain *domains.NlpTrainingRecordDomain)
}

// NewNlpTrainingRecordRepository new nlp record instance
func NewNlpTrainingRecordRepository(data *gorm.DB) INlpRecordTrainingRepository {
	return &NlpRecordTrainingRepository{data}
}

// Save create new nlp record domain
func (repo *NlpRecordTrainingRepository) Save(nlpTrainingRecordDomain *domains.NlpTrainingRecordDomain) {
	repo.Datasources.Create(&nlpTrainingRecordDomain)
}
