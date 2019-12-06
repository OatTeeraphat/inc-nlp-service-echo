package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	nlp "inc-nlp-service-echo/core_module/nlprecord"
	"inc-nlp-service-echo/kafka_module/producer"
)

// Service NlpService
type Service struct {
	nlpTrainingRecordRepository repositories.INlpTrainingLogRepository
	nlpRecordRepository         repositories.INlpRecordRepository
	nlpDashboardRepository      repositories.INlpDashboardRepository
	appStoryRepository          repositories.IAppStoryRepository
	kafkaProducer               *producer.Producer
}

// NewService NewNlpService
func NewService(repo0 repositories.INlpRecordRepository, repo1 repositories.INlpTrainingLogRepository, repo2 repositories.IAppStoryRepository, repo3 repositories.INlpDashboardRepository, pro0 *producer.Producer) nlp.Service {
	return &Service{
		nlpRecordRepository:         repo0,
		nlpTrainingRecordRepository: repo1,
		appStoryRepository:          repo2,
		nlpDashboardRepository:      repo3,
		kafkaProducer:               pro0,
	}
}
