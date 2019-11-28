package service

import (
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlp/dao"
	"math"
	"strconv"

	"github.com/labstack/gommon/log"
)

// SearchPagination SearchPagination
func (svc Service) SearchPagination(keyword string, intent string, story string, page string) dao.SearchPaginationDao {
	var nlpRecordPaginationSearchModel dao.SearchPaginationDao

	nlpRecordPaginationSearchModel.Page = page
	nlpRecordPaginationSearchModel.Limit = "50"

	pageInt, err := strconv.Atoi(page)

	if err != nil {
		log.Error(err)
	}

	nlpRecordPaginationSearchModel.NlpRecords = []dao.NlpRecords{}

	log.Info(keyword)

	if keyword == "" {

		nlpRecordsCount := svc.nlpRecordRepository.Count()
		pageSizeFloat := float64(nlpRecordsCount) / 50
		nlpRecordPaginationSearchModel.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

		for _, item := range svc.nlpRecordRepository.Pagination(pageInt, 50) {
			var nlpModels dao.NlpRecords
			nlpModels.ID = item.ID
			nlpModels.Keyword = item.Keyword
			nlpModels.Intent = item.Intent
			nlpModels.StoryName = "mock_story_name"
			nlpModels.UpdatedAt = item.UpdatedAt

			nlpRecordPaginationSearchModel.NlpRecords = append(nlpRecordPaginationSearchModel.NlpRecords, nlpModels)
		}
	} else {

		nlpRecordsCount := svc.nlpRecordRepository.CountByKeywordMinhash(distance.GenerateKeywordMinhash(keyword))
		pageSizeFloat := float64(nlpRecordsCount) / 50
		nlpRecordPaginationSearchModel.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

		for _, item := range svc.nlpRecordRepository.PaginationByKeywordMinhash(distance.GenerateKeywordMinhash(keyword), pageInt, 50) {
			var nlpModels dao.NlpRecords
			nlpModels.ID = item.ID
			nlpModels.Keyword = item.Keyword
			nlpModels.Intent = item.Intent
			nlpModels.StoryName = "mock_story_name"
			nlpModels.UpdatedAt = item.UpdatedAt

			nlpRecordPaginationSearchModel.NlpRecords = append(nlpRecordPaginationSearchModel.NlpRecords, nlpModels)
		}
	}

	return nlpRecordPaginationSearchModel
}
