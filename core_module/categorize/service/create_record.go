package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"
	"strconv"

	"github.com/labstack/gommon/log"
)

// CreateRecord CreateRecord
func (svc Service) CreateRecord(shopID string, storyIDs []string) string {
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
