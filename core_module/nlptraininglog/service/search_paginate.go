package service

import (
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlptraininglog/dao"
	"math"
	"strconv"

	log "github.com/sirupsen/logrus"
)

// SearchPagination SearchPagination
func (s Service) SearchPagination(Page string, keyword string) dao.SearchPaginationDao {
	var searchPaginateDao dao.SearchPaginationDao

	searchPaginateDao.Page = Page
	searchPaginateDao.Limit = "40"

	nlpTrainingLogCount := s.nlpTrainingLogRepository.Count()

	pageSizeFloat := float64(nlpTrainingLogCount) / 40

	searchPaginateDao.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

	pageInt, err := strconv.Atoi(Page)

	if err != nil {
		log.Error(err)
	}

	if keyword == "" {
		for _, item := range s.nlpTrainingLogRepository.Pagination(pageInt, 40) {
			var nlpModels dao.NlpTrainingLog

			nlpModels.ID = item.ID.String()
			nlpModels.Keyword = item.Keyword
			nlpModels.Intent = item.Intent
			nlpModels.StoryName = "mock_story_name"
			nlpModels.Distance = item.Distance
			nlpModels.UpdatedAt = item.UpdatedAt

			searchPaginateDao.NlpTrainingLog = append(searchPaginateDao.NlpTrainingLog, nlpModels)
		}
	} else {

		// log.Info(keyword)

		nlpTrainingLogCount := s.nlpTrainingLogRepository.CountByKeywordMinhash(distance.GenerateKeywordMinhash(keyword))

		pageSizeFloat := float64(nlpTrainingLogCount) / 50
		searchPaginateDao.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

		for _, item := range s.nlpTrainingLogRepository.PaginationByKeywordMinhash(distance.GenerateKeywordMinhash(keyword), pageInt, 50) {
			var nlpModels dao.NlpTrainingLog
			nlpModels.ID = item.ID.String()
			nlpModels.Keyword = item.Keyword
			nlpModels.Intent = item.Intent
			nlpModels.StoryName = "mock_story_name"
			nlpModels.UpdatedAt = item.UpdatedAt

			searchPaginateDao.NlpTrainingLog = append(searchPaginateDao.NlpTrainingLog, nlpModels)
		}
	}
	return searchPaginateDao
}
