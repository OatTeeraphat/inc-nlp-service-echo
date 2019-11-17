package repositories

import (
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/domains"
)

// ShopRepository shop repository
type ShopRepository struct {
	*datasources.FillChatGORM
}

// IShopRepository shop repository interface
type IShopRepository interface {
	FindByID(ID uint) domains.ShopDomain
}

// NewShopRepository shop repository
func NewShopRepository(data *datasources.FillChatGORM) IShopRepository {
	return &ShopRepository{data}
}

// FindByID FindByID
func (repo ShopRepository) FindByID(ID uint) domains.ShopDomain {
	var shopDomain domains.ShopDomain
	repo.DB.First(&shopDomain, ID)
	return shopDomain
}
