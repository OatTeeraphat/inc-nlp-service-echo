package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
)

// NlpDashboardRepository nlp dashboard repository
type NlpDashboardRepository struct {
	*datasources.FillChatGORM
}

// INlpDashboardRepository nlp dashboard repository interface
type INlpDashboardRepository interface {
	FindByID(ID uint) domains.NlpDashboardDomain
	FindGreaterThanByID(ID uint) []domains.NlpDashboardDomain
	Save(domain *domains.NlpDashboardDomain) *gorm.DB
}

// NewNlpDashboardRepository nlp dashboard repository
func NewNlpDashboardRepository(data *datasources.FillChatGORM) INlpDashboardRepository {
	return &NlpDashboardRepository{data}
}

// FindByID FindByID
func (repo NlpDashboardRepository) FindByID(ID uint) domains.NlpDashboardDomain {
	var domain domains.NlpDashboardDomain
	repo.DB.First(&domain, ID)
	return domain
}

// Save Save
func (repo NlpDashboardRepository) Save(domain *domains.NlpDashboardDomain) *gorm.DB {
	return repo.DB.Create(&domain)
}

// FindGreaterThanByID FindGreaterThanByID
func (repo NlpDashboardRepository) FindGreaterThanByID(ID uint) []domains.NlpDashboardDomain {
	var domain []domains.NlpDashboardDomain
	repo.DB.Where("id > ?", ID).Find(&domain)
	return domain
}
