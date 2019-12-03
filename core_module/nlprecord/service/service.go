package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	nlp "inc-nlp-service-echo/core_module/nlprecord"
)

// Service NlpService
type Service struct {
	nlpTrainingRecordRepository repositories.INlpTrainingLogRepository
	nlpRecordRepository         repositories.INlpRecordRepository
	nlpDashboardRepository      repositories.INlpDashboardRepository
	shopStoryRepository         repositories.IShopStoryRepository
}

// NewService NewNlpService
func NewService(repo0 repositories.INlpRecordRepository, repo1 repositories.INlpTrainingLogRepository, repo2 repositories.IShopStoryRepository, repo3 repositories.INlpDashboardRepository) nlp.Service {
	return &Service{
		nlpRecordRepository:         repo0,
		nlpTrainingRecordRepository: repo1,
		shopStoryRepository:         repo2,
		nlpDashboardRepository:      repo3,
	}
}
