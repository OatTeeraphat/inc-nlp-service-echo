package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"
	"strconv"

	"github.com/labstack/gommon/log"
)

// CreateRecord CreateRecord
func (svc Service) CreateRecord(appID string, storyIDs []string) string {
	log.Info(appID, storyIDs)

	u32, err := strconv.ParseUint(appID, 10, 32)
	if err != nil {
		fmt.Println(err)
	}

	appDomainFoundByID := svc.AppRepo.FindByID(uint(u32))

	if appDomainFoundByID.ID == 0 {
		return "Not OK"
	}

	for _, item := range storyIDs {

		var domain domains.AppStoryDomain

		domain.AppID = uint32(u32)

		appIDu32, err := strconv.ParseUint(item, 10, 32)
		if err != nil {
			fmt.Println(err)
		}

		domain.StoryID = uint32(appIDu32)

		svc.AppStoryRepo.Save(&domain)
	}

	return "OK"
}
