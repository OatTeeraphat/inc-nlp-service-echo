package service

import (
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlptraininglog"
	"inc-nlp-service-echo/core_module/nlptraininglog/dao"
	"math"
	"strconv"

	log "github.com/sirupsen/logrus"
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

// ReadPaginationNlpTrainingLogService ReadPaginationNlpRecordService
func (s Service) ReadPaginationNlpTrainingLogService(PageID string, keyword string) dao.NlpTrainingLogPaginationSearchModel {
	var nlpTrainingLogPaginationSearchModel dao.NlpTrainingLogPaginationSearchModel

	nlpTrainingLogPaginationSearchModel.Page = PageID
	nlpTrainingLogPaginationSearchModel.Limit = "40"

	nlpTrainingLogCount := s.nlpTrainingLogRepository.Count()

	pageSizeFloat := float64(nlpTrainingLogCount) / 40

	nlpTrainingLogPaginationSearchModel.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

	pageInt, err := strconv.Atoi(PageID)

	if err != nil {
		log.Error(err)
	}

	// log.Info(nlpTrainingLogCount)

	if keyword == "" {
		for _, item := range s.nlpTrainingLogRepository.Pagination(pageInt, 40) {
			var nlpModels dao.NlpTrainingLog
			nlpModels.ID = item.ID
			nlpModels.Keyword = item.Keyword
			nlpModels.Intent = item.Intent
			nlpModels.StoryName = "mock_story_name"
			nlpModels.Distance = item.Distance
			nlpModels.UpdatedAt = item.UpdatedAt

			nlpTrainingLogPaginationSearchModel.NlpTrainingLog = append(nlpTrainingLogPaginationSearchModel.NlpTrainingLog, nlpModels)
		}
	} else {

		// log.Info(keyword)

		nlpTrainingLogCount := s.nlpTrainingLogRepository.CountByKeywordMinhash(distance.GenerateKeywordMinhash(keyword))

		pageSizeFloat := float64(nlpTrainingLogCount) / 50
		nlpTrainingLogPaginationSearchModel.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

		for _, item := range s.nlpTrainingLogRepository.PaginationByKeywordMinhash(distance.GenerateKeywordMinhash(keyword), pageInt, 50) {
			var nlpModels dao.NlpTrainingLog
			nlpModels.ID = item.ID
			nlpModels.Keyword = item.Keyword
			nlpModels.Intent = item.Intent
			nlpModels.StoryName = "mock_story_name"
			nlpModels.UpdatedAt = item.UpdatedAt

			nlpTrainingLogPaginationSearchModel.NlpTrainingLog = append(nlpTrainingLogPaginationSearchModel.NlpTrainingLog, nlpModels)
		}
	}
	return nlpTrainingLogPaginationSearchModel
}

// DeleteByID DeleteByID
func (s Service) DeleteByID(ID string) (string, error) {
	u64, err := strconv.ParseUint(ID, 10, 32)
	if err != nil {
		return "INVALID", err
	}

	domainID := uint(u64)

	s.nlpTrainingLogRepository.DeleteByID(domainID)

	return "OK", nil
}

// BulkDeleteByID BulkDeleteByID
func (s Service) BulkDeleteByID(IDs []uint) (string, error) {

	s.nlpTrainingLogRepository.BulkDeleteByIDs(IDs)

	return "OK", nil
}
