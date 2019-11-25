package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/shop"
)

// ShopService ShopService
type ShopService struct {
	shopRepo repositories.IShopRepository
}

// NewShopService NewShopService
func NewShopService(repo1 repositories.IShopRepository) shop.IShopService {
	return &ShopService{
		repo1,
	}
}

// ReadShopByIDService ReadShopByIDService
func (svc ShopService) ReadShopByIDService(ID string) string {
	return "OK"
}
