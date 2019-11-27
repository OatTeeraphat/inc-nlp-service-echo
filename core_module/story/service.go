package story

import "inc-nlp-service-echo/core_module/story/dao"

// Service story service
type Service interface {
	ReadAllStoryRecordService() []dao.StoryModel
	NewStoryRecordService(newStoryModel dao.NewStoryModel) string
	DeleteStoryByIDService(storyID string) string
}
