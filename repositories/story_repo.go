package repositories

import (
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/domains"

	"github.com/jinzhu/gorm"
)

// StoryRepository shop story mapping
type StoryRepository struct {
	*datasources.FillChatGORM
}

// IStoryRepository story desc interface
type IStoryRepository interface {
	Save(storyDomain *domains.StoryDomain)
	FindAll() []domains.StoryDomain
	FindByName(storyName string) domains.StoryDomain
	DeleteByID(ID uint) *gorm.DB
}

// NewStoryRepository story desc instance
func NewStoryRepository(data *datasources.FillChatGORM) IStoryRepository {
	return &StoryRepository{data}
}

// Save find similar shop ids
func (repo *StoryRepository) Save(storyDomain *domains.StoryDomain) {
	repo.DB.Create(&storyDomain)
}

// FindAll find similar shop ids
func (repo *StoryRepository) FindAll() []domains.StoryDomain {
	var storyDomain []domains.StoryDomain
	repo.DB.Where(&domains.StoryDomain{}).Find(&storyDomain)
	return storyDomain
}

// FindByName find similar shop ids
func (repo *StoryRepository) FindByName(storyName string) domains.StoryDomain {
	var storyDomain domains.StoryDomain
	repo.DB.Where(&domains.StoryDomain{Name: storyName}).Find(&storyDomain)
	return storyDomain
}

// DeleteByID DeleteByID
func (repo *StoryRepository) DeleteByID(ID uint) *gorm.DB {
	var storyDomain domains.StoryDomain
	storyDomain.ID = ID
	return repo.DB.Unscoped().Delete(&storyDomain)
}
