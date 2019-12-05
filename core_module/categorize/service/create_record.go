package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"

	"github.com/labstack/gommon/log"
	uuid "github.com/satori/go.uuid"
)

// CreateRecord CreateRecord
func (svc Service) CreateRecord(appID string, storyIDs []string) string {
	log.Info(appID, storyIDs)

	u2, err := uuid.FromString(appID)
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return "..."
	}

	for _, item := range storyIDs {

		var domain domains.AppStoryDomain

		domain.AppID = u2

		appUUID, err := uuid.FromString(item)
		if err != nil {
			fmt.Printf("Something went wrong: %s", err)
			return "..."
		}

		domain.StoryID = appUUID

		svc.AppStoryRepo.Save(&domain)
	}

	return "OK"
}
