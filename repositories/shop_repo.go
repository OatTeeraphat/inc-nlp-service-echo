package repositories

import (
	"inc-nlp-service-echo/domains"

	"github.com/jinzhu/gorm"
)

// ShopRepository shop repository
type ShopRepository struct {
	Datasources *gorm.DB
}

// IShopRepository shop repository interface
type IShopRepository interface {
	FindByID(ID uint) domains.ShopDomain
}

// NewShopRepository shop repository
func NewShopRepository(data *gorm.DB) IShopRepository {
	return &ShopRepository{data}
}

// FindByID FindByID
func (repo ShopRepository) FindByID(ID uint) domains.ShopDomain {
	var shopDomain domains.ShopDomain
	repo.Datasources.First(&shopDomain, ID)
	return shopDomain
}
