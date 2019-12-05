package service

import (
	"inc-nlp-service-echo/business_module/domains"
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
		newDomain := domains.NlpRecordDomain{}
		newDomain.Keyword = keyword
		newDomain.Intent = intent
		newDomain.KeywordMinhash = distance.GenerateKeywordMinhash(keyword)
		nlpRecord = append(nlpRecord, newDomain)
	}

	log.Print(nlpRecord)

	log.Info("before upload")

	go svc.nlpRecordRepository.BulkInsert(nlpRecord, 1000)

	return "OK"
}
