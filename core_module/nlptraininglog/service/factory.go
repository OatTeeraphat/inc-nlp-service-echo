package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/nlptraininglog"
)

// Service NlpTrainingLogService
type Service struct {
	nlpRecordRepository      repositories.INlpRecordRepository
	nlpTrainingLogRepository repositories.INlpTrainingLogRepository
}

// NewService NewService
func NewService(repo0 repositories.INlpRecordRepository, repo1 repositories.INlpTrainingLogRepository) nlptraininglog.Service {
	return &Service{
		nlpRecordRepository:      repo0,
		nlpTrainingLogRepository: repo1,
	}
}
