package story

import "inc-nlp-service-echo/core_module/story/dao"

// IStoryService INlpService
type IStoryService interface {
	ReadAllStoryRecordService() []dao.StoryModel
	NewStoryRecordService(newStoryModel dao.NewStoryModel) string
	DeleteStoryByIDService(storyID string) string
}
