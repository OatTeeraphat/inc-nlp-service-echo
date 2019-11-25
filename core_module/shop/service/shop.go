package service

import (
	"inc-nlp-service-echo/business_module/repositories"
)

// ShopService ShopService
type ShopService struct {
	shopRepo repositories.IShopRepository
}

// IShopService IShopService
type IShopService interface {
	ReadShopByIDService(ID string) string
}

// NewShopService NewShopService
func NewShopService(repo1 repositories.IShopRepository) IShopService {
	return &ShopService{
		repo1,
	}
}

// ReadShopByIDService ReadShopByIDService
func (svc ShopService) ReadShopByIDService(ID string) string {
	return "OK"
}
