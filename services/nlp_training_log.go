package services

import (
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/repositories"
	"math"
	"strconv"

	log "github.com/sirupsen/logrus"
)

// NlpTrainingLogService NlpTrainingLogService
type NlpTrainingLogService struct {
	nlpTrainingLogRepository repositories.INlpTrainingLogRepository
}

// INlpTrainingLogService INlpTrainingLogService
type INlpTrainingLogService interface {
	ReadPaginationNlpRecordService(PageID string) string
}

// NewNlpTrainingLogService NewNlpTrainingLogService
func NewNlpTrainingLogService(repo1 repositories.INlpTrainingLogRepository) INlpTrainingLogService {
	return &NlpTrainingLogService{
		repo1,
	}
}

// ReadPaginationNlpRecordService ReadPaginationNlpRecordService
func (repo NlpTrainingLogService) ReadPaginationNlpRecordService(PageID string) string {
	var nlpTrainingLogPaginationSearchModel models.NlpTrainingLogPaginationSearchModel

	nlpTrainingLogPaginationSearchModel.Page = PageID
	nlpTrainingLogPaginationSearchModel.Limit = "40"

	nlpTrainingLogCount := repo.nlpTrainingLogRepository.Count()

	pageSizeFloat := float64(nlpTrainingLogCount) / 40

	nlpTrainingLogPaginationSearchModel.Total = strconv.FormatFloat(math.Floor(pageSizeFloat), 'f', 0, 64)

	pageInt, err := strconv.Atoi(PageID)

	if err != nil {
		log.Error(err)
	}

	log.Info(nlpTrainingLogCount)

	// nlpRecordPaginationSearchModel.NlpRecords = []models.NlpRecords{}

	for _, item := range repo.nlpTrainingLogRepository.Pagination(pageInt, 40) {
		var nlpModels models.NlpTrainingLog
		nlpModels.ID = item.ID
		nlpModels.Keyword = item.Keyword
		nlpModels.Intent = item.Intent
		nlpModels.StoryName = "mock_story_name"

		nlpTrainingLogPaginationSearchModel.NlpTrainingLog = append(nlpTrainingLogPaginationSearchModel.NlpTrainingLog, nlpModels)
	}

	// return nlpRecordPaginationSearchModel
	return "OK"
}
