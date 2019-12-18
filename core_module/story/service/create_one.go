package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/core_module/story/dao"

	uuid "github.com/satori/go.uuid"
)

// CreateOneStory CreateOneStory
func (s Service) CreateOneStory(newStoryModel dao.NewStoryDao) string {
	var storyRecord domains.StoryDomain

	_, err := uuid.FromString(newStoryModel.AppID)

	if err != nil {
		return "invalid"
	}

	isStoryNameExisting := s.storyRepo.FindByName(newStoryModel.Name)

	if isStoryNameExisting.Name != "" {
		return "invalid"
	}

	storyRecord.Name = newStoryModel.Name
	storyRecord.Description = newStoryModel.Description
	storyRecord.AppID = uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000")

	s.storyRepo.Save(&storyRecord)

	return "OK"
}
