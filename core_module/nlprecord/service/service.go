package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/nlprecord"
)

// Service NlpService
type Service struct {
	nlpTrainingRecordRepository repositories.INlpTrainingLogRepository
	nlpRecordRepository         repositories.INlpRecordRepository
	shopStoryRepository         repositories.IShopStoryRepository
}

// NewService NewNlpService
func NewService(nlpRecordRepository repositories.INlpRecordRepository, nlpTrainingRecordRepository repositories.INlpTrainingLogRepository, shopStoryRepository repositories.IShopStoryRepository) nlp.Service {
	return &Service{
		nlpTrainingRecordRepository,
		nlpRecordRepository,
		shopStoryRepository,
	}
}
