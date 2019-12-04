package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/nlptraininglog"
)

// Service NlpTrainingLogService
type Service struct {
	nlpTrainingLogRepository repositories.INlpTrainingLogRepository
}

// NewService NewService
func NewService(repo1 repositories.INlpTrainingLogRepository) nlptraininglog.Service {
	return &Service{
		repo1,
	}
}
