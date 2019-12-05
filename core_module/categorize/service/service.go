package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/categorize"
)

// Service AppStoryService
type Service struct {
	AppStoryRepo repositories.IAppStoryRepository
	AppRepo      repositories.IAppRepository
}

// NewService NewAppStoryService
func NewService(repo0 repositories.IAppStoryRepository, repo1 repositories.IAppRepository) categorize.Service {
	return &Service{
		repo0,
		repo1,
	}
}
