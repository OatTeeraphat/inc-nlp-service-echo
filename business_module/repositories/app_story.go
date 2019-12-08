package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	uuid "github.com/satori/go.uuid"
)

// AppStoryRepository app story mapping
type AppStoryRepository struct {
	*datasources.GORM
}

// IAppStoryRepository app story mapping interface
type IAppStoryRepository interface {
	Save(Domain *domains.AppStoryDomain)
	FindByAppID(appID uuid.UUID) []domains.AppStoryDomain
}

// NewAppStoryRepository app story mapping instance
func NewAppStoryRepository(data *datasources.GORM) IAppStoryRepository {
	return &AppStoryRepository{data}
}

// Save find similar app ids
func (repo *AppStoryRepository) Save(Domain *domains.AppStoryDomain) {
	repo.DB.Create(&Domain)
}

// FindByAppID find similar app ids
func (repo *AppStoryRepository) FindByAppID(appID uuid.UUID) []domains.AppStoryDomain {
	var Domain []domains.AppStoryDomain
	repo.DB.Where(&domains.AppStoryDomain{StoryID: appID}).Find(&Domain)
	return Domain
}
