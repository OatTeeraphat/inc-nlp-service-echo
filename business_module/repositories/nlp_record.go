package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
)

// NlpRecordRepository nlp query appearance
type NlpRecordRepository struct {
	*datasources.FillChatGORM
}

// INlpRecordRepository nlp query appearance interface
type INlpRecordRepository interface {
	Save(nlpRecordDomain *domains.NlpRecordDomain)
	BulkInsertNlpRecords(nlpRecordDomain []interface{}, bulkCount int) error
	BulkDeleteNlpRecordsByIDs(nlpRecordDomain []uint) *gorm.DB
	FindByKeywordMinhash(keywordMinhash uint32) []domains.NlpRecordDomain
	FindByKeywordMinhashAndStoryID(keywordMinhash uint32, storyID []uint32) []domains.NlpRecordDomain
	FindByKeyword(keyword string) []domains.NlpRecordDomain
	Pagination(PageIndex int, Limit int) []domains.NlpRecordDomain
	PaginationByKeywordMinhash(KeywordMinhash uint32, PageIndex int, Limit int) []domains.NlpRecordDomain
	Count() int64
	CountByKeywordMinhash(KeywordMinhash uint32) int64
	Delete() *gorm.DB
	DeleteNlpRecordByID(id uint) *gorm.DB
}

// NewNlpRecordRepository new nlp record instance
func NewNlpRecordRepository(data *datasources.FillChatGORM) INlpRecordRepository {
	return &NlpRecordRepository{data}
}

// Save create new nlp record domain
func (repo *NlpRecordRepository) Save(nlpRecordDomain *domains.NlpRecordDomain) {
	repo.DB.Create(&nlpRecordDomain)
}

// FindByKeyword find similar keyword group
func (repo *NlpRecordRepository) FindByKeyword(keyword string) []domains.NlpRecordDomain {
	var nlpRecordDomain []domains.NlpRecordDomain
	repo.DB.Where("keyword = ?", keyword).Find(&nlpRecordDomain)
	return nlpRecordDomain
}

// FindByKeywordMinhashAndStoryID find similar keyword group and story ids
func (repo *NlpRecordRepository) FindByKeywordMinhashAndStoryID(keywordMinhash uint32, storyID []uint32) []domains.NlpRecordDomain {
	var nlpRecordDomain []domains.NlpRecordDomain
	repo.DB.Where("story_id IN(?) and keyword_minhash = ?", storyID, keywordMinhash).Find(&nlpRecordDomain)
	return nlpRecordDomain
}

// FindByKeywordMinhash find similar keyword group
func (repo *NlpRecordRepository) FindByKeywordMinhash(keywordMinhash uint32) []domains.NlpRecordDomain {
	var nlpRecordDomain []domains.NlpRecordDomain
	repo.DB.Where("keyword_minhash = ?", keywordMinhash).Find(&nlpRecordDomain)
	return nlpRecordDomain
}

// BulkInsertNlpRecords BulkInsertNlpRecords
func (repo *NlpRecordRepository) BulkInsertNlpRecords(nlpRecordDomain []interface{}, bulkCount int) error {
	return repo.BulkInsert(nlpRecordDomain, bulkCount)
}

// BulkDeleteNlpRecordsByIDs BulkDeleteNlpRecordsByIDs
func (repo *NlpRecordRepository) BulkDeleteNlpRecordsByIDs(ids []uint) *gorm.DB {
	return repo.DB.Unscoped().Where(ids).Delete(&domains.NlpRecordDomain{})
}

// Delete Delete
func (repo *NlpRecordRepository) Delete() *gorm.DB {
	return repo.DB.Unscoped().Delete(&domains.NlpRecordDomain{})
}

// Count Count
func (repo *NlpRecordRepository) Count() int64 {
	var totalPage int64
	repo.DB.Model(&domains.NlpRecordDomain{}).Where(&domains.NlpRecordDomain{}).Count(&totalPage)
	return totalPage
}

// CountByKeywordMinhash CountByKeywordMinhash
func (repo *NlpRecordRepository) CountByKeywordMinhash(KeywordMinhash uint32) int64 {
	var totalPage int64
	repo.DB.Model(&domains.NlpRecordDomain{}).Where(&domains.NlpRecordDomain{KeywordMinhash: KeywordMinhash}).Count(&totalPage)
	return totalPage
}

// Pagination Pagination
func (repo *NlpRecordRepository) Pagination(PageIndex int, Limit int) []domains.NlpRecordDomain {
	var nlpRecordDomain []domains.NlpRecordDomain
	repo.DB.Limit(Limit).Find(&nlpRecordDomain).Offset(Limit * (PageIndex - 1)).Order("id desc").Find(&nlpRecordDomain)
	return nlpRecordDomain
}

// PaginationByKeywordMinhash PaginationByKeywordMinhash
func (repo *NlpRecordRepository) PaginationByKeywordMinhash(KeywordMinhash uint32, PageIndex int, Limit int) []domains.NlpRecordDomain {
	var nlpRecordDomain []domains.NlpRecordDomain
	repo.DB.Where(&domains.NlpRecordDomain{KeywordMinhash: KeywordMinhash}).Limit(Limit).Find(&nlpRecordDomain).Offset(Limit * (PageIndex - 1)).Order("id desc").Find(&nlpRecordDomain)
	return nlpRecordDomain
}

// DeleteNlpRecordByID DeleteNlpRecordByID
func (repo *NlpRecordRepository) DeleteNlpRecordByID(id uint) *gorm.DB {
	domain := &domains.NlpRecordDomain{}
	domain.ID = id
	return repo.DB.Unscoped().Delete(domain)
}