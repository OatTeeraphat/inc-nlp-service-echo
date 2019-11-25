package service

import (
	"fmt"
	"inc-nlp-service-echo/domains"
	"inc-nlp-service-echo/nlp"
	"inc-nlp-service-echo/nlp/dao"
	"inc-nlp-service-echo/repositories"
	"inc-nlp-service-echo/utils"
	"math"
	"strconv"
	"strings"

	"github.com/labstack/gommon/log"
)

// NlpRecordService NlpService
type NlpRecordService struct {
	nlpTrainingRecordRepository repositories.INlpTrainingLogRepository
	nlpRecordRepository         repositories.INlpRecordRepository
	shopStoryRepository         repositories.IShopStoryRepository
}

// INlpRecordService INlpService
type INlpRecordService interface {
	UploadXlsxNlpRecordService(xlsxSheet [][]string) string
	DropNlpReplyByShopService() string
	ReadPaginationNlpRecordService(keyword string, intent string, story string, page string) dao.NlpRecordPaginationSearchModel
	ReadNlpReplyModelService(keyword string, shopID string) dao.NlpReplyModel
	CreateNlpRecordService(createNlpModel []dao.CreateNlpRecordModel) string
	RemoveNlpRecordByID(id string) string
	BulkDeleteNlpRecordByIDs(ids []uint) (string, error)
	UpdateNlpRecordByIDAndClientID(id string) string
}

// NewNlpRecordService NewNlpService
func NewNlpRecordService(nlpRecordRepository repositories.INlpRecordRepository, nlpTrainingRecordRepository repositories.INlpTrainingLogRepository, shopStoryRepository repositories.IShopStoryRepository) INlpRecordService {
	return &NlpRecordService{
		nlpTrainingRecordRepository,
		nlpRecordRepository,
		shopStoryRepository,
	}
}

// CreateNlpRecordService GetNlpModelReply
func (svc NlpRecordService) CreateNlpRecordService(createNlpModel []dao.CreateNlpRecordModel) string {

	for _, item := range createNlpModel {
		hashValue := nlp.GenerateKeywordMinhash(item.Keyword)

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
			KeywordMinhash: nlp.GenerateKeywordMinhash(keyword),
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

// ReadNlpReplyModelService ReadNlpReplyModel
func (svc NlpRecordService) ReadNlpReplyModelService(keyword string, shopID string) dao.NlpReplyModel {
	var nlpReplyModel []dao.NlpReplyModel
	var listStoryIDsInShopFound []uint32
	var keywordMinhash uint32

	if keyword == "" {
		log.Fatal("no keyword")
	}

	keywordMinhash = nlp.GenerateKeywordMinhash(keyword)

	shopStoryDomainFoundByShopID := svc.shopStoryRepository.FindByShopID(1)

	for _, item := range shopStoryDomainFoundByShopID {
		listStoryIDsInShopFound = append(listStoryIDsInShopFound, item.StoryID)
	}

	// nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhash(hashValue)
	nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhashAndStoryID(keywordMinhash, listStoryIDsInShopFound)

	if len(nlpFindByKeyword) == 0 {
		// log.WithFields(log.Fields{"step": 1, "module": "NLP_MODULE"}).Info("no module")
		nlpReplyModel := dao.NlpReplyModel{
			Keyword:  keyword,
			Intent:   "DEFAULT_MESSAGE",
			Distance: 999,
		}
		svc.saveNlpTrainingSetsService(&nlpReplyModel, 1)
		return nlpReplyModel
	}

	for _, item := range nlpFindByKeyword {
		eachNlpModel := dao.NlpReplyModel{Keyword: item.Keyword, Intent: item.Intent, StoryID: item.StoryID}
		eachNlpModel.Keyword = item.Keyword
		eachNlpModel.Intent = item.Intent
		eachNlpModel.StoryID = item.StoryID
		nlpReplyModel = append(nlpReplyModel, eachNlpModel)
	}

	// log.WithFields(log.Fields{"step": 1, "module": "NLP_MODULE"}).Info(nlpReplyModel)
	nlpResult := nlp.FindMinDistanceFromNlpModels(nlpReplyModel, keyword)
	// log.WithFields(log.Fields{"step": 4, "module": "NLP_MODULE"}).Info(nlpResult)

	if nlpResult.Distance != 0 {
		go svc.saveNlpTrainingSetsService(&nlpResult, 1)
	}
	return nlpResult
}

// saveNlpTrainingSetsService saveNlpTrainingSetsService
func (svc NlpRecordService) saveNlpTrainingSetsService(nlpResult *dao.NlpReplyModel, shopID uint) {
	var nlpTraningRecordDomain domains.NlpTrainingLogDomain
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
func (svc NlpRecordService) ReadPaginationNlpRecordService(keyword string, intent string, story string, page string) dao.NlpRecordPaginationSearchModel {
	var nlpRecordPaginationSearchModel dao.NlpRecordPaginationSearchModel

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

			nlpRecordPaginationSearchModel.NlpRecords = append(nlpRecordPaginationSearchModel.NlpRecords, nlpModels)
		}
	} else {

		nlpRecordsCount := svc.nlpRecordRepository.CountByKeywordMinhash(nlp.GenerateKeywordMinhash(keyword))
		pageSizeFloat := float64(nlpRecordsCount) / 50
		nlpRecordPaginationSearchModel.Total = strconv.FormatFloat(math.Ceil(pageSizeFloat), 'f', 0, 64)

		for _, item := range svc.nlpRecordRepository.PaginationByKeywordMinhash(nlp.GenerateKeywordMinhash(keyword), pageInt, 50) {
			var nlpModels dao.NlpRecords
			nlpModels.ID = item.ID
			nlpModels.Keyword = item.Keyword
			nlpModels.Intent = item.Intent
			nlpModels.StoryName = "mock_story_name"

			nlpRecordPaginationSearchModel.NlpRecords = append(nlpRecordPaginationSearchModel.NlpRecords, nlpModels)
		}
	}

	return nlpRecordPaginationSearchModel
}

// RemoveNlpRecordByID RemoveNlpRecordByID
func (svc NlpRecordService) RemoveNlpRecordByID(id string) string {

	u64, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		fmt.Println(err)
	}
	nlpRecordID := uint(u64)

	svc.nlpRecordRepository.DeleteNlpRecordByID(nlpRecordID)

	return "OK"
}

// BulkDeleteNlpRecordByIDs BulkDeleteNlpRecordByIDs
func (svc NlpRecordService) BulkDeleteNlpRecordByIDs(ids []uint) (string, error) {

	var idsForDelete []uint

	for _, id := range ids {
		idsForDelete = append(idsForDelete, id)
	}

	go svc.nlpRecordRepository.BulkDeleteNlpRecordsByIDs(idsForDelete)

	return "OK", nil
}

// UpdateNlpRecordByIDAndClientID UpdateNlpRecordByIDAndClientID
func (svc NlpRecordService) UpdateNlpRecordByIDAndClientID(id string) string {
	log.Debug(id)

	return "OK"
}
