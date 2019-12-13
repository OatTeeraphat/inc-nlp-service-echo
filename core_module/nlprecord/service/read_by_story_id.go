package service

import (
	"inc-nlp-service-echo/core_module/nlprecord/dao"
	"math"
	"strconv"
	"strings"

	"github.com/labstack/gommon/log"
)

// ReadByStoryIDs ReadByStoryIDs
func (svc Service) ReadByStoryIDs(page string, storyIDs string) dao.ReadNlpRecordByStoryIDsResponse {

	readNlpRecordByStoryIDsResponse := dao.ReadNlpRecordByStoryIDsResponse{}

	listStoryIDs := strings.Split(storyIDs, ",")

	pageIndex, err := strconv.Atoi(page)

	if err != nil {
		log.Error(err)
		pageIndex = 1
	}

	readNlpRecordByStoryIDsResponse.NLPRecord = []dao.NlpRecord{}

	count := svc.nlpRecordRepository.CountByStoryIDs(listStoryIDs)

	pageSizeFloat := float64(count) / 50

	readNlpRecordByStoryIDsResponse.Page = page
	readNlpRecordByStoryIDsResponse.Limit = "50"
	readNlpRecordByStoryIDsResponse.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

	domains := svc.nlpRecordRepository.PaginationByStoryIDs(listStoryIDs, pageIndex, 50)

	for _, item := range domains {

		var eachItem dao.NlpRecord
		eachItem.ID = item.ID.String()
		eachItem.Keyword = item.Keyword
		eachItem.Intent = item.Intent
		eachItem.UpdatedAt = item.UpdatedAt.String()

		readNlpRecordByStoryIDsResponse.NLPRecord = append(readNlpRecordByStoryIDsResponse.NLPRecord, eachItem)
	}

	return readNlpRecordByStoryIDsResponse
}
