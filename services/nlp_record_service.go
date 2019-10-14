package services

import (
	"inc-nlp-service-echo/domains"
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/nlps"
	"inc-nlp-service-echo/repositories"
	"inc-nlp-service-echo/utils"
	"strings"

	log "github.com/sirupsen/logrus"
)

// NlpRecordService NlpService
type NlpRecordService struct {
	nlpTrainingRecordRepository repositories.INlpRecordTrainingRepository
	nlpRecordRepository         repositories.INlpRecordRepository
}

// INlpRecordService INlpService
type INlpRecordService interface {
	UploadXlsxNlpRecord(xlsxSheet [][]string) string
	DropNlpReplyByShop() string
	ReadNlpReplyModel(keyword string, shopID string) models.NlpReplyModel
	CreateNlpRecord(createNlpModel []models.CreateNlpRecordModel) string
}

// NewNlpRecordService NewNlpService
func NewNlpRecordService(nlpRecordRepository repositories.INlpRecordRepository, nlpTrainingRecordRepository repositories.INlpRecordTrainingRepository) INlpRecordService {
	return &NlpRecordService{
		nlpTrainingRecordRepository,
		nlpRecordRepository,
	}
}

// CreateNlpRecord GetNlpModelReply
func (svc NlpRecordService) CreateNlpRecord(createNlpModel []models.CreateNlpRecordModel) string {

	for _, item := range createNlpModel {
		var nlpRecordDomain domains.NlpRecordDomain
		nlpRecordDomain.Keyword = item.Keyword
		hashValue := nlps.GenerateKeywordMinhash(item.Keyword)
		nlpRecordDomain.KeywordMinhash = hashValue
		nlpRecordDomain.Intent = item.Intent

		svc.nlpRecordRepository.Save(&nlpRecordDomain)
	}
	return "OK"
}

// UploadXlsxNlpRecord XlsxCreateNlpRecord
func (svc NlpRecordService) UploadXlsxNlpRecord(xlsxSheet [][]string) string {

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
			KeywordMinhash: nlps.GenerateKeywordMinhash(keyword),
			StoryID:        utils.NewRandomIDBetween(1, 3),
		})
	}

	err := svc.nlpRecordRepository.BulkCreateNlpRecords(nlpRecord, 3000)

	if err != nil {
		log.Fatal(err)
	}

	return "OK"
}

// ReadNlpReplyModel ReadNlpReplyModel
func (svc NlpRecordService) ReadNlpReplyModel(keyword string, shopID string) models.NlpReplyModel {
	var nlpReplyModel []models.NlpReplyModel
	var listStoryIDsInShopFound []uint32
	var keywordMinhash uint32

	if keyword == "" {
		log.Fatal("no keyword")
	}

	keywordMinhash = nlps.GenerateKeywordMinhash(keyword)
	listStoryIDsInShopFound = []uint32{1, 2}

	// nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhash(hashValue)
	nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhashAndStoryID(keywordMinhash, listStoryIDsInShopFound)

	if len(nlpFindByKeyword) == 0 {
		// log.WithFields(log.Fields{"step": 1, "module": "NLP_MODULE"}).Info("no module")
		nlpReplyModel := models.NlpReplyModel{
			Keyword:  keyword,
			Intent:   "DEFAULT_MESSAGE",
			Distance: 999,
		}
		svc.SaveNlpTrainingSets(&nlpReplyModel, 1)
		return nlpReplyModel
	}

	for _, item := range nlpFindByKeyword {
		eachNlpModel := models.NlpReplyModel{Keyword: item.Keyword, Intent: item.Intent, StoryID: item.StoryID}
		eachNlpModel.Keyword = item.Keyword
		eachNlpModel.Intent = item.Intent
		eachNlpModel.StoryID = item.StoryID
		nlpReplyModel = append(nlpReplyModel, eachNlpModel)
	}

	// log.WithFields(log.Fields{"step": 1, "module": "NLP_MODULE"}).Info(nlpReplyModel)
	nlpResult := nlps.FindMinDistanceFromNlpModels(nlpReplyModel, keyword)
	// log.WithFields(log.Fields{"step": 4, "module": "NLP_MODULE"}).Info(nlpResult)

	if nlpResult.Distance != 0 {
		svc.SaveNlpTrainingSets(&nlpResult, 1)
	}
	return nlpResult
}

// SaveNlpTrainingSets SaveNlpTrainingSets
func (svc NlpRecordService) SaveNlpTrainingSets(nlpResult *models.NlpReplyModel, shopID uint) {
	var nlpTraningRecordDomain domains.NlpTrainingRecordDomain
	nlpTraningRecordDomain.Keyword = nlpResult.Keyword
	nlpTraningRecordDomain.Intent = nlpResult.Intent
	nlpTraningRecordDomain.Distance = nlpResult.Distance
	nlpTraningRecordDomain.StoryID = nlpResult.StoryID
	svc.nlpTrainingRecordRepository.Save(&nlpTraningRecordDomain)
}

// DropNlpReplyByShop DropNlpReplyByShop
func (svc NlpRecordService) DropNlpReplyByShop() string {

	svc.nlpRecordRepository.Delete()
	return "OK"
}
