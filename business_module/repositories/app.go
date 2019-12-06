package repositories

import (
	uuid "github.com/satori/go.uuid"
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"
)

// AppRepository app repository
type AppRepository struct {
	*datasources.GORM
}

// IAppRepository app repository interface
type IAppRepository interface {
	FindByID(ID uuid.UUID) domains.AppDomain
}

// NewAppRepository app repository
func NewAppRepository(data *datasources.GORM) IAppRepository {
	return &AppRepository{data}
}

// FindByID FindByID
func (repo AppRepository) FindByID(ID uuid.UUID) domains.AppDomain {
	var appDomain domains.AppDomain
	repo.DB.First(&appDomain, ID)
	return appDomain
}
