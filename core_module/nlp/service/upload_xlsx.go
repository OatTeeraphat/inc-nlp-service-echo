package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/common_module/utils"
	"inc-nlp-service-echo/computing_module/distance"
	"strings"

	"github.com/labstack/gommon/log"
)

// UploadXlsx UploadXlsx
func (svc Service) UploadXlsx(xlsxSheet [][]string) string {

	var nlpRecord []interface{}
	var tooLongSentence int

	for index := range xlsxSheet {
		if index == 0 {
			continue
		}

		var keyword string
		var intent string
		// column 0

		if strings.ToLower(xlsxSheet[0][0]) == "keyword" {
			keyword = xlsxSheet[index][0]
		}
		// column 1
		if strings.ToLower(xlsxSheet[0][1]) == "intent" {
			intent = xlsxSheet[index][1]
		}
		if len(keyword) > 75 || len(keyword) == 0 {
			tooLongSentence++
			continue
		}
		if len(intent) > 75 || len(intent) == 0 {
			tooLongSentence++
			continue
		}
		nlpRecord = append(nlpRecord, domains.NlpRecordDomain{
			Keyword:        keyword,
			Intent:         intent,
			KeywordMinhash: distance.GenerateKeywordMinhash(keyword),
			StoryID:        utils.NewRandomIDBetween(1, 3),
		})
	}

	var ret error

	log.Error("before upload")

	go func() {
		ret = svc.nlpRecordRepository.BulkInsertNlpRecords(nlpRecord, 200)
	}()

	if ret != nil {
		log.Error("error up load nlp record")
	}

	return "OK"
}
