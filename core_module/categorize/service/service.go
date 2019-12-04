package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/categorize"
)

// Service ShopStoryService
type Service struct {
	ShopStoryRepo repositories.IShopStoryRepository
	ShopRepo      repositories.IShopRepository
}

// NewService NewShopStoryService
func NewService(repo0 repositories.IShopStoryRepository, repo1 repositories.IShopRepository) categorize.Service {
	return &Service{
		repo0,
		repo1,
	}
}
