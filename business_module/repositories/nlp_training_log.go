package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
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
	DeleteByID(ID uuid.UUID) *gorm.DB
	BulkDeleteByIDs(ids []uuid.UUID) *gorm.DB
	CountByKeywordMinhash(KeywordMinhash uint32) int64
	PaginationByKeywordMinhash(KeywordMinhash uint32, PageIndex int, Limit int) []domains.NlpTrainingLogDomain
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
func (repo *NlpTrainingLogRepository) Pagination(PageIndex int, Limit int) []domains.NlpTrainingLogDomain {
	var nlpTrainingLogDomain []domains.NlpTrainingLogDomain
	repo.DB.Limit(Limit).Find(&nlpTrainingLogDomain).Offset(Limit * (PageIndex - 1)).Order("id desc").Find(&nlpTrainingLogDomain)
	return nlpTrainingLogDomain
}

// DeleteByID DeleteByID..
func (repo *NlpTrainingLogRepository) DeleteByID(ID uuid.UUID) *gorm.DB {
	domain := &domains.NlpTrainingLogDomain{}
	domain.ID = ID
	return repo.DB.Unscoped().Delete(domain)
}

// BulkDeleteByIDs BulkDeleteByIDs
func (repo *NlpTrainingLogRepository) BulkDeleteByIDs(ids []uuid.UUID) *gorm.DB {
	return repo.DB.Unscoped().Where(ids).Delete(&domains.NlpTrainingLogDomain{})
}

// CountByKeywordMinhash CountByKeywordMinhash
func (repo *NlpTrainingLogRepository) CountByKeywordMinhash(KeywordMinhash uint32) int64 {
	var totalPage int64
	repo.DB.Model(&domains.NlpTrainingLogDomain{}).Where(&domains.NlpTrainingLogDomain{KeywordMinhash: KeywordMinhash}).Count(&totalPage)
	return totalPage
}

// PaginationByKeywordMinhash PaginationByKeywordMinhash
func (repo *NlpTrainingLogRepository) PaginationByKeywordMinhash(KeywordMinhash uint32, PageIndex int, Limit int) []domains.NlpTrainingLogDomain {
	var nlpTraininglogDomain []domains.NlpTrainingLogDomain
	repo.DB.Where(&domains.NlpTrainingLogDomain{KeywordMinhash: KeywordMinhash}).Limit(Limit).Find(&nlpTraininglogDomain).Offset(Limit * (PageIndex - 1)).Order("id desc").Find(&nlpTraininglogDomain)
	return nlpTraininglogDomain
}
