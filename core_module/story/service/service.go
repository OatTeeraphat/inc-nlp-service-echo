package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/story"
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
