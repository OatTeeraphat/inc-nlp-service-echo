package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	uuid "github.com/satori/go.uuid"
)

// AppStoryRepository app story mapping
type AppStoryRepository struct {
	*datasources.FillChatGORM
}

// IAppStoryRepository app story mapping interface
type IAppStoryRepository interface {
	Save(appStoryDomain *domains.AppStoryDomain)
	FindByAppID(appID uuid.UUID) []domains.AppStoryDomain
}

// NewAppStoryRepository app story mapping instance
func NewAppStoryRepository(data *datasources.FillChatGORM) IAppStoryRepository {
	return &AppStoryRepository{data}
}

// Save find similar app ids
func (repo *AppStoryRepository) Save(appStoryDomain *domains.AppStoryDomain) {
	repo.DB.Create(&appStoryDomain)
}

// FindByAppID find similar app ids
func (repo *AppStoryRepository) FindByAppID(appID uuid.UUID) []domains.AppStoryDomain {
	var appStoryDomain []domains.AppStoryDomain
	repo.DB.Where(&domains.AppStoryDomain{StoryID: appID}).Find(&appStoryDomain)
	return appStoryDomain
}
