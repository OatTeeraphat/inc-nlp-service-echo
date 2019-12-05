package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

// ClientRepository app repository
type ClientRepository struct {
	*datasources.FillChatGORM
}

// IClientRepository app repository interface
type IClientRepository interface {
	Save(domain *domains.ClientDomain) *gorm.DB
	FindByID(ID uuid.UUID) domains.ClientDomain
}

// NewClientRepository app repository
func NewClientRepository(data *datasources.FillChatGORM) IClientRepository {
	return &ClientRepository{data}
}

// Save Save
func (repo ClientRepository) Save(domain *domains.ClientDomain) *gorm.DB {
	return repo.DB.Create(&domain)
}

// FindByID FindByID
func (repo ClientRepository) FindByID(ID uuid.UUID) domains.ClientDomain {
	var domain domains.ClientDomain
	repo.DB.First(&domain, ID)
	return domain
}
