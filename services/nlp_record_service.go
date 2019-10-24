package services

import (
	"inc-nlp-service-echo/domains"
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/nlps"
	"inc-nlp-service-echo/repositories"
	"inc-nlp-service-echo/utils"
	"math"
	"strconv"
	"strings"

	log "github.com/sirupsen/logrus"
)

// NlpRecordService NlpService
type NlpRecordService struct {
	nlpTrainingRecordRepository repositories.INlpRecordTrainingRepository
	nlpRecordRepository         repositories.INlpRecordRepository
	shopStoryRepository         repositories.IShopStoryRepository
}

// INlpRecordService INlpService
type INlpRecordService interface {
	UploadXlsxNlpRecordService(xlsxSheet [][]string) string
	DropNlpReplyByShopService() string
	ReadPaginationNlpRecordService(keyword string, intent string, story string, page string) models.NlpRecordPaginationSearchModel
	ReadNlpReplyModelService(keyword string, shopID string) models.NlpReplyModel
	CreateNlpRecordService(createNlpModel []models.CreateNlpRecordModel) string
}

// NewNlpRecordService NewNlpService
func NewNlpRecordService(nlpRecordRepository repositories.INlpRecordRepository, nlpTrainingRecordRepository repositories.INlpRecordTrainingRepository, shopStoryRepository repositories.IShopStoryRepository) INlpRecordService {
	return &NlpRecordService{
		nlpTrainingRecordRepository,
		nlpRecordRepository,
		shopStoryRepository,
	}
}

// CreateNlpRecordService GetNlpModelReply
func (svc NlpRecordService) CreateNlpRecordService(createNlpModel []models.CreateNlpRecordModel) string {

	for _, item := range createNlpModel {
		hashValue := nlps.GenerateKeywordMinhash(item.Keyword)

		var nlpRecordDomain domains.NlpRecordDomain
		nlpRecordDomain.Keyword = item.Keyword
		nlpRecordDomain.KeywordMinhash = hashValue
		nlpRecordDomain.Intent = item.Intent

		svc.nlpRecordRepository.Save(&nlpRecordDomain)
	}
	return "OK"
}

// UploadXlsxNlpRecordService XlsxCreateNlpRecord
func (svc NlpRecordService) UploadXlsxNlpRecordService(xlsxSheet [][]string) string {

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

// ReadNlpReplyModelService ReadNlpReplyModel
func (svc NlpRecordService) ReadNlpReplyModelService(keyword string, shopID string) models.NlpReplyModel {
	var nlpReplyModel []models.NlpReplyModel
	var listStoryIDsInShopFound []uint32
	var keywordMinhash uint32

	if keyword == "" {
		log.Fatal("no keyword")
	}

	keywordMinhash = nlps.GenerateKeywordMinhash(keyword)

	shopStoryDomainFoundByShopID := svc.shopStoryRepository.FindByShopID(1)

	for _, item := range shopStoryDomainFoundByShopID {
		listStoryIDsInShopFound = append(listStoryIDsInShopFound, item.StoryID)
	}

	// nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhash(hashValue)
	nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhashAndStoryID(keywordMinhash, listStoryIDsInShopFound)

	if len(nlpFindByKeyword) == 0 {
		// log.WithFields(log.Fields{"step": 1, "module": "NLP_MODULE"}).Info("no module")
		nlpReplyModel := models.NlpReplyModel{
			Keyword:  keyword,
			Intent:   "DEFAULT_MESSAGE",
			Distance: 999,
		}
		svc.SaveNlpTrainingSetsService(&nlpReplyModel, 1)
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
		svc.SaveNlpTrainingSetsService(&nlpResult, 1)
	}
	return nlpResult
}

// SaveNlpTrainingSetsService SaveNlpTrainingSets
func (svc NlpRecordService) SaveNlpTrainingSetsService(nlpResult *models.NlpReplyModel, shopID uint) {
	var nlpTraningRecordDomain domains.NlpTrainingRecordDomain
	nlpTraningRecordDomain.Keyword = nlpResult.Keyword
	nlpTraningRecordDomain.Intent = nlpResult.Intent
	nlpTraningRecordDomain.Distance = nlpResult.Distance
	nlpTraningRecordDomain.StoryID = nlpResult.StoryID
	svc.nlpTrainingRecordRepository.Save(&nlpTraningRecordDomain)
}

// DropNlpReplyByShopService DropNlpReplyByShop
func (svc NlpRecordService) DropNlpReplyByShopService() string {
	svc.nlpRecordRepository.Delete()
	return "OK"
}

// ReadPaginationNlpRecordService ReadPaginationNlpRecordService
func (svc NlpRecordService) ReadPaginationNlpRecordService(keyword string, intent string, story string, page string) models.NlpRecordPaginationSearchModel {
	var nlpRecordPaginationSearchModel models.NlpRecordPaginationSearchModel

	nlpRecordPaginationSearchModel.Page = page
	nlpRecordPaginationSearchModel.Limit = "40"

	nlpRecordsCount := svc.nlpRecordRepository.Count()

	pageSizeFloat := float64(nlpRecordsCount) / 40

	nlpRecordPaginationSearchModel.Total = strconv.FormatFloat(math.Floor(pageSizeFloat), 'f', 0, 64)

	pageInt, err := strconv.Atoi(page)

	if err != nil {
		log.Error(err)
	}

	log.Info(nlpRecordsCount)

	// nlpRecordPaginationSearchModel.Total = string(nlpRecordsCount)

	nlpRecordPaginationSearchModel.NlpRecords = []models.NlpRecords{}

	for _, item := range svc.nlpRecordRepository.Pagination(pageInt, 40) {
		var nlpModels models.NlpRecords
		nlpModels.ID = item.ID
		nlpModels.Keyword = item.Keyword
		nlpModels.Intent = item.Intent
		nlpModels.StoryName = "mock_story_name"

		nlpRecordPaginationSearchModel.NlpRecords = append(nlpRecordPaginationSearchModel.NlpRecords, nlpModels)
	}

	return nlpRecordPaginationSearchModel
}
