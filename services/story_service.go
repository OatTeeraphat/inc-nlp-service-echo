package services

import (
	"fmt"
	"inc-nlp-service-echo/domains"
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/repositories"
	"strconv"
)

// StoryService NlpService
type StoryService struct {
	storyRepo repositories.IStoryRepository
}

// IStoryService INlpService
type IStoryService interface {
	ReadAllStoryRecordService() []models.StoryModel
	NewStoryRecordService(newStoryModel models.NewStoryModel) string
	DeleteStoryByIDService(storyID string) string
}

// NewStoryService NewNlpService
func NewStoryService(repo1 repositories.IStoryRepository) IStoryService {
	return &StoryService{
		storyRepo: repo1,
	}
}

// ReadAllStoryRecordService ReadAllStoryRecordService
func (svc StoryService) ReadAllStoryRecordService() []models.StoryModel {
	var storyRecord []domains.StoryDomain
	var storyModel []models.StoryModel
	storyRecord = svc.storyRepo.FindAll()

	for _, item := range storyRecord {
		eachStory := models.StoryModel{}
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
func (svc StoryService) NewStoryRecordService(newStoryModel models.NewStoryModel) string {
	var storyRecord domains.StoryDomain

	isStoryNameExisting := svc.storyRepo.FindByName(newStoryModel.Name)

	if isStoryNameExisting.Name != "" {
		return "invalid"
	}

	storyRecord.Name = newStoryModel.Name
	storyRecord.Description = newStoryModel.Description
	storyRecord.Owner = newStoryModel.Owner

	svc.storyRepo.Save(&storyRecord)

	return "OK"
}

// DeleteStoryByIDService DeleteStoryByIDService
func (svc StoryService) DeleteStoryByIDService(storyID string) string {

	u64, err := strconv.ParseUint(storyID, 10, 32)
	if err != nil {
		fmt.Println(err)
	}
	storyIDConverted := uint(u64)

	svc.storyRepo.DeleteByID(storyIDConverted)

	return "OK"
}
