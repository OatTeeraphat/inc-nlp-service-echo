package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/shop"
)

// Service ShopService
type Service struct {
	shopRepo repositories.IShopRepository
}

// NewService NewShopService
func NewService(repo1 repositories.IShopRepository) shop.Service {
	return &Service{
		repo1,
	}
}
