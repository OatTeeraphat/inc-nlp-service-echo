package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

// NlpDashboardRepository nlp dashboard repository
type NlpDashboardRepository struct {
	*datasources.FillChatGORM
}

// INlpDashboardRepository nlp dashboard repository interface
type INlpDashboardRepository interface {
	FindByID(ID uuid.UUID) domains.NlpDashboardDomain
	FindGreaterThanByID(ID uuid.UUID) []domains.NlpDashboardDomain
	Save(domain *domains.NlpDashboardDomain) *gorm.DB
}

// NewNlpDashboardRepository nlp dashboard repository
func NewNlpDashboardRepository(data *datasources.FillChatGORM) INlpDashboardRepository {
	return &NlpDashboardRepository{data}
}

// FindByID FindByID
func (repo NlpDashboardRepository) FindByID(ID uuid.UUID) domains.NlpDashboardDomain {
	var domain domains.NlpDashboardDomain
	repo.DB.First(&domain, ID)
	return domain
}

// Save Save
func (repo NlpDashboardRepository) Save(domain *domains.NlpDashboardDomain) *gorm.DB {
	return repo.DB.Create(&domain)
}

// FindGreaterThanByID FindGreaterThanByID
func (repo NlpDashboardRepository) FindGreaterThanByID(ID uuid.UUID) []domains.NlpDashboardDomain {
	var domain []domains.NlpDashboardDomain
	repo.DB.Where("id > ?", ID).Find(&domain)
	return domain
}
