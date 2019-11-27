package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/shop"
)

// NewService ShopService
type Service struct {
	shopRepo repositories.IShopRepository
}

// NewService NewShopService
func NewService(repo1 repositories.IShopRepository) shop.Service {
	return &Service{
		repo1,
	}
}

// ReadShopByIDService ReadShopByIDService
func (svc Service) ReadShopByIDService(ID string) string {
	return "OK"
}
