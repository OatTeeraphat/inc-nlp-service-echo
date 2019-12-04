package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"
)

// AppRepository app repository
type AppRepository struct {
	*datasources.FillChatGORM
}

// IAppRepository app repository interface
type IAppRepository interface {
	FindByID(ID uint) domains.AppDomain
}

// NewAppRepository app repository
func NewAppRepository(data *datasources.FillChatGORM) IAppRepository {
	return &AppRepository{data}
}

// FindByID FindByID
func (repo AppRepository) FindByID(ID uint) domains.AppDomain {
	var appDomain domains.AppDomain
	repo.DB.First(&appDomain, ID)
	return appDomain
}
