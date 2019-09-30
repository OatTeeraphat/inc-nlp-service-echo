package services

import (
	"inc-nlp-service-echo/domains"
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/nlps"
	"inc-nlp-service-echo/repositories"
	"log"
	"strconv"
	"strings"
)

// NlpRecordService NlpService
type NlpRecordService struct {
	nlpTrainingRecordRepository repositories.INlpRecordTrainingRepository
	nlpRecordRepository         repositories.INlpRecordRepository
}

// INlpRecordService INlpService
type INlpRecordService interface {
	UploadXlsxNlpRecord(shopID string, xlsxSheet [][]string) string
	DropNlpReplyByShop(ShopID string) string
	ReadNlpReplyModel(keyword string, shopID string) models.NlpReplyModel
	CreateNlpRecord(createNlpModel []models.CreateNlpRecordModel, shopID string) string
}

// NewNlpRecordService NewNlpService
func NewNlpRecordService(nlpRecordRepository repositories.INlpRecordRepository, nlpTrainingRecordRepository repositories.INlpRecordTrainingRepository) INlpRecordService {
	return &NlpRecordService{
		nlpTrainingRecordRepository,
		nlpRecordRepository,
	}
}

// CreateNlpRecord GetNlpModelReply
func (svc NlpRecordService) CreateNlpRecord(createNlpModel []models.CreateNlpRecordModel, shopID string) string {
	shopIDParseUint, err := strconv.ParseUint(shopID, 10, 32)

	if err != nil {
		log.Fatal(err)
	}

	for _, item := range createNlpModel {
		var nlpRecordDomain domains.NlpRecordDomain
		nlpRecordDomain.ShopID = uint(shopIDParseUint)
		nlpRecordDomain.Keyword = item.Keyword
		hashValue := nlps.GenerateKeywordMinhash(item.Keyword)
		nlpRecordDomain.KeywordMinhash = hashValue
		nlpRecordDomain.Intent = item.Intent

		svc.nlpRecordRepository.Save(&nlpRecordDomain)
	}
	return "OK"
}

// UploadXlsxNlpRecord XlsxCreateNlpRecord
func (svc NlpRecordService) UploadXlsxNlpRecord(shopID string, xlsxSheet [][]string) string {
	shopIDParseUint, err := strconv.ParseUint(shopID, 10, 32)

	if err != nil {
		log.Fatal(err)
	}

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
			ShopID:         uint(shopIDParseUint),
			Keyword:        keyword,
			Intent:         intent,
			KeywordMinhash: nlps.GenerateKeywordMinhash(keyword),
		})
	}

	err = svc.nlpRecordRepository.BulkCreateNlpRecords(uint(shopIDParseUint), nlpRecord)

	if err != nil {
		log.Fatal(err)
	}

	return "OK"
}

// ReadNlpReplyModel ReadNlpReplyModel
func (svc NlpRecordService) ReadNlpReplyModel(keyword string, shopID string) models.NlpReplyModel {
	var nlpReplyModel []models.NlpReplyModel

	if keyword == "" {
		log.Fatal("no keyword")
	}

	shopIDParseUint, err := strconv.ParseUint(shopID, 10, 32)

	if err != nil {
		return nlpReplyModel[0]
	}

	if shopIDParseUint == 0 {
		nlpReplyModel = append(nlpReplyModel, models.NlpReplyModel{})
		return nlpReplyModel[0]
	}

	hashValue := nlps.GenerateKeywordMinhash(keyword)
	nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhash(uint(shopIDParseUint), hashValue)

	if len(nlpFindByKeyword) == 0 {
		nlpReplyModel = append(nlpReplyModel, models.NlpReplyModel{})
		return nlpReplyModel[0]
	}

	for _, item := range nlpFindByKeyword {
		nlpReplyModel = append(nlpReplyModel, models.NlpReplyModel{Keyword: item.Keyword, Intent: item.Intent})
	}

	nlpResult := nlps.FindMinDistanceFromNlpModels(nlpReplyModel, keyword)

	if nlpResult.Distance != 0 {
		var nlpTraningRecordDomain domains.NlpTrainingRecordDomain
		nlpTraningRecordDomain.ShopID = 1
		nlpTraningRecordDomain.Keyword = nlpResult.Keyword
		nlpTraningRecordDomain.Intent = nlpResult.Intent
		nlpTraningRecordDomain.Distance = nlpResult.Distance
		svc.nlpTrainingRecordRepository.Save(&nlpTraningRecordDomain)
	}
	return nlpResult
}

// DropNlpReplyByShop DropNlpReplyByShop
func (svc NlpRecordService) DropNlpReplyByShop(shopID string) string {

	shopIDParseUint, err := strconv.ParseUint(shopID, 10, 32)

	if err != nil {
		log.Println(err)
	}

	svc.nlpRecordRepository.DeleteByShopID(uint(shopIDParseUint))

	return "OK"
}
