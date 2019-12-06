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
	Save(storyDomain *domains.StoryDomain)
	FindAll() []domains.StoryDomain
	FindByName(storyName string) domains.StoryDomain
	DeleteByID(ID uuid.UUID) *gorm.DB
}

// NewStoryRepository story desc instance
func NewStoryRepository(data *datasources.GORM) IStoryRepository {
	return &StoryRepository{data}
}

// Save find similar app ids
func (repo *StoryRepository) Save(storyDomain *domains.StoryDomain) {
	repo.DB.Create(&storyDomain)
}

// FindAll find similar app ids
func (repo *StoryRepository) FindAll() []domains.StoryDomain {
	var storyDomain []domains.StoryDomain
	repo.DB.Where(&domains.StoryDomain{}).Find(&storyDomain)
	return storyDomain
}

// FindByName find similar app ids
func (repo *StoryRepository) FindByName(storyName string) domains.StoryDomain {
	var storyDomain domains.StoryDomain
	repo.DB.Where(&domains.StoryDomain{Name: storyName}).Find(&storyDomain)
	return storyDomain
}

// DeleteByID DeleteByID
func (repo *StoryRepository) DeleteByID(ID uuid.UUID) *gorm.DB {
	var storyDomain domains.StoryDomain
	storyDomain.ID = ID
	return repo.DB.Unscoped().Delete(&storyDomain)
}
