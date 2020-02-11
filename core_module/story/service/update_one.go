package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"
)

// UpdateOneByID UpdateOneByID
func (s Service) UpdateOneByID(StoryID string) string {
	var storyDomain []domains.StoryDomain

	fmt.Print(storyDomain)
	fmt.Print(StoryID)

	return "OK"
}
