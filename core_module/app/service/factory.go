package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/app"
)

// Service AppService
type Service struct {
	appRepo repositories.IAppRepository
}

// NewService NewAppService
func NewService(repo1 repositories.IAppRepository) app.Service {
	return &Service{
		repo1,
	}
}
