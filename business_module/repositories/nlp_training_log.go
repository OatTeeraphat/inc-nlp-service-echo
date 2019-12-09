package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

// NlpTrainingLogRepository nlp query appearance
type NlpTrainingLogRepository struct {
	*datasources.GORM
}

// INlpTrainingLogRepository nlp query appearance interface
type INlpTrainingLogRepository interface {
	Save(Domain *domains.NlpTrainingLogDomain)
	FindByID(ID uuid.UUID) domains.NlpTrainingLogDomain
	Count() int64
	Pagination(PageIndex int, Limit int) []domains.NlpTrainingLogDomain
	DeleteByID(ID uuid.UUID) *gorm.DB
	BulkDeleteByIDs(ids []string) *gorm.DB
	CountByKeywordMinhash(KeywordMinhash uint32) int64
	PaginationByKeywordMinhash(KeywordMinhash uint32, PageIndex int, Limit int) []domains.NlpTrainingLogDomain
}

// NewNlpTrainingLogRepository new nlp record instance
func NewNlpTrainingLogRepository(data *datasources.GORM) INlpTrainingLogRepository {
	return &NlpTrainingLogRepository{data}
}

// Save create new nlp record domain
func (repo *NlpTrainingLogRepository) Save(Domain *domains.NlpTrainingLogDomain) {
	repo.DB.Create(&Domain)
}

// Count Count
func (repo *NlpTrainingLogRepository) Count() int64 {
	var totalPage int64
	repo.DB.Table("nlp_training_logs").Count(&totalPage)
	return totalPage
}

// FindByID FindByID
func (repo *NlpTrainingLogRepository) FindByID(ID uuid.UUID) domains.NlpTrainingLogDomain {
	var Domain domains.NlpTrainingLogDomain
	repo.DB.Where("id = ?", ID).Find(&Domain)
	return Domain
}

// Pagination Pagination
func (repo *NlpTrainingLogRepository) Pagination(PageIndex int, Limit int) []domains.NlpTrainingLogDomain {
	var Domain []domains.NlpTrainingLogDomain
	repo.DB.Limit(Limit).Find(&Domain).Offset(Limit * (PageIndex - 1)).Order("updated_at desc").Find(&Domain)
	return Domain
}

// DeleteByID DeleteByID..
func (repo *NlpTrainingLogRepository) DeleteByID(ID uuid.UUID) *gorm.DB {
	Domain := &domains.NlpTrainingLogDomain{}
	Domain.ID = ID
	return repo.DB.Unscoped().Delete(Domain)
}

// BulkDeleteByIDs BulkDeleteByIDs
func (repo *NlpTrainingLogRepository) BulkDeleteByIDs(ids []string) *gorm.DB {
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
	var Domain []domains.NlpTrainingLogDomain
	repo.DB.Where(&domains.NlpTrainingLogDomain{KeywordMinhash: KeywordMinhash}).Limit(Limit).Find(&Domain).Offset(Limit * (PageIndex - 1)).Order("updated_at desc").Find(&Domain)
	return Domain
}
