package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/nlpdashboard"
)

// Service Service
type Service struct {
	nlpDashboardRepository repositories.INlpDashboardRepository
}

// NewService NewService
func NewService(repo repositories.INlpDashboardRepository) nlpdashboard.Service {
	return &Service{
		nlpDashboardRepository: repo,
	}
}
