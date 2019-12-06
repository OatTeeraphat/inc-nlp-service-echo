package repositories

import (
	"inc-nlp-service-echo/business_module/datasources"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

// ClientRepository app repository
type ClientRepository struct {
	*datasources.GORM
}

// IClientRepository app repository interface
type IClientRepository interface {
	Save(Domain *domains.ClientDomain) *gorm.DB
	FindByID(ID uuid.UUID) domains.ClientDomain
}

// NewClientRepository app repository
func NewClientRepository(data *datasources.GORM) IClientRepository {
	return &ClientRepository{data}
}

// Save Save
func (repo ClientRepository) Save(Domain *domains.ClientDomain) *gorm.DB {
	return repo.DB.Create(&Domain)
}

// FindByID FindByID
func (repo ClientRepository) FindByID(ID uuid.UUID) domains.ClientDomain {
	var Domain domains.ClientDomain
	repo.DB.First(&Domain, ID)
	return Domain
}
