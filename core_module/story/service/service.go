package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/story"
	"inc-nlp-service-echo/core_module/story/dao"
	"strconv"
)

// Service Service
type Service struct {
	storyRepo repositories.IStoryRepository
}

// NewService NewNlpService
func NewService(repo repositories.IStoryRepository) story.Service {
	return &Service{
		storyRepo: repo,
	}
}

// ReadAllStoryRecordService ReadAllStoryRecordService
func (s Service) ReadAllStoryRecordService() []dao.StoryModel {
	var storyRecord []domains.StoryDomain
	var storyModel []dao.StoryModel
	storyRecord = s.storyRepo.FindAll()

	for _, item := range storyRecord {
		eachStory := dao.StoryModel{}
		eachStory.ID = item.ID
		eachStory.Name = item.Name
		eachStory.Description = item.Description
		eachStory.Owner = item.Owner
		eachStory.CreateAt = item.CreatedAt.Unix()
		eachStory.UpdatedAt = item.UpdatedAt.Unix()

		storyModel = append(storyModel, eachStory)
	}

	return storyModel
}

// NewStoryRecordService NewStoryRecordService
func (s Service) NewStoryRecordService(newStoryModel dao.NewStoryModel) string {
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

// DeleteStoryByIDService DeleteStoryByIDService
func (s Service) DeleteStoryByIDService(storyID string) string {

	u64, err := strconv.ParseUint(storyID, 10, 32)
	if err != nil {
		fmt.Println(err)
	}
	storyIDConverted := uint(u64)

	s.storyRepo.DeleteByID(storyIDConverted)

	return "OK"
}
