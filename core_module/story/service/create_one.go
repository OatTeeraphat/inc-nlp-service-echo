package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/core_module/story/dao"
)

// CreateOneStory CreateOneStory
func (s Service) CreateOneStory(newStoryModel dao.NewStoryDao) string {
	var storyRecord domains.StoryDomain

	isStoryNameExisting := s.storyRepo.FindByName(newStoryModel.Name)

	if isStoryNameExisting.Name != "" {
		return "invalid"
	}

	storyRecord.Name = newStoryModel.Name
	storyRecord.Description = newStoryModel.Description
	storyRecord.Owner = newStoryModel.Owner

	s.storyRepo.Save(&storyRecord)

	return "OK"
}