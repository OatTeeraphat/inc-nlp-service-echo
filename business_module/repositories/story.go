package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

// StoryRepository app story mapping
type StoryRepository struct {
	*datasources.GORM
}

// IStoryRepository story desc interface
type IStoryRepository interface {
	Save(Domain *domains.StoryDomain)
	FindAll() []domains.StoryDomain
	FindByName(storyName string) domains.StoryDomain
	DeleteByID(ID uuid.UUID) *gorm.DB
}

// NewStoryRepository story desc instance
func NewStoryRepository(data *datasources.GORM) IStoryRepository {
	return &StoryRepository{data}
}

// Save find similar app ids
func (repo *StoryRepository) Save(Domain *domains.StoryDomain) {
	repo.DB.Create(&Domain)
}

// FindAll find similar app ids
func (repo *StoryRepository) FindAll() []domains.StoryDomain {
	var Domain []domains.StoryDomain
	repo.DB.Where(&domains.StoryDomain{}).Find(&Domain)
	return Domain
}

// FindByName find similar app ids
func (repo *StoryRepository) FindByName(storyName string) domains.StoryDomain {
	var Domain domains.StoryDomain
	repo.DB.Where(&domains.StoryDomain{Name: storyName}).Find(&Domain)
	return Domain
}

// DeleteByID DeleteByID
func (repo *StoryRepository) DeleteByID(ID uuid.UUID) *gorm.DB {
	var Domain domains.StoryDomain
	Domain.ID = ID
	return repo.DB.Unscoped().Delete(&Domain)
}
