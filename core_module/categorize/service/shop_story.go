package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/categorize"
	"strconv"

	"github.com/labstack/gommon/log"
)

// ShopStoryService ShopStoryService
type ShopStoryService struct {
	ShopStoryRepo repositories.IShopStoryRepository
	ShopRepo      repositories.IShopRepository
}

// NewShopStoryService NewShopStoryService
func NewShopStoryService(repo0 repositories.IShopStoryRepository, repo1 repositories.IShopRepository) categorize.IShopStoryService {
	return &ShopStoryService{
		repo0,
		repo1,
	}
}

// CreateShopStoryService CreateShopStoryService
func (svc ShopStoryService) CreateShopStoryService(shopID string, storyIDs []string) string {
	log.Info(shopID, storyIDs)

	u32, err := strconv.ParseUint(shopID, 10, 32)
	if err != nil {
		fmt.Println(err)
	}

	shopDomainFoundByID := svc.ShopRepo.FindByID(uint(u32))

	if shopDomainFoundByID.ID == 0 {
		return "Not OK"
	}

	for _, item := range storyIDs {

		var domain domains.ShopStoryDomain

		domain.ShopID = uint32(u32)

		shopIDu32, err := strconv.ParseUint(item, 10, 32)
		if err != nil {
			fmt.Println(err)
		}

		domain.StoryID = uint32(shopIDu32)

		svc.ShopStoryRepo.Save(&domain)
	}

	return "OK"
}
