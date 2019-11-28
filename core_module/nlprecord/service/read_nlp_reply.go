package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	"github.com/labstack/gommon/log"
)

// ReadNlpReplyModelService ReadNlpReplyModel
func (svc Service) ReadNlpReply(keyword string, shopID string) dao.ReadNlpReplyDao {
	var readNlpReplyDao []dao.ReadNlpReplyDao
	var listStoryIDsInShopFound []uint32
	var keywordMinhash uint32

	if keyword == "" {
		log.Fatal("no keyword")
	}

	keywordMinhash = distance.GenerateKeywordMinhash(keyword)

	shopStoryDomainFoundByShopID := svc.shopStoryRepository.FindByShopID(1)

	for _, item := range shopStoryDomainFoundByShopID {
		listStoryIDsInShopFound = append(listStoryIDsInShopFound, item.StoryID)
	}

	// nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhash(hashValue)
	nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhashAndStoryID(keywordMinhash, listStoryIDsInShopFound)

	if len(nlpFindByKeyword) == 0 {
		readNlpReplyDao := dao.ReadNlpReplyDao{
			Keyword:  keyword,
			Intent:   "DEFAULT_MESSAGE",
			Distance: 999,
		}

		go svc.saveToNlpTrainingLogs(&readNlpReplyDao, 1)

		return readNlpReplyDao
	}

	for _, item := range nlpFindByKeyword {
		eachNlpModel := dao.ReadNlpReplyDao{Keyword: item.Keyword, Intent: item.Intent, StoryID: item.StoryID}
		eachNlpModel.Keyword = item.Keyword
		eachNlpModel.Intent = item.Intent
		eachNlpModel.StoryID = item.StoryID
		readNlpReplyDao = append(readNlpReplyDao, eachNlpModel)
	}

	nlpResult := distance.FindMinDistanceFromNlpModels(readNlpReplyDao, keyword)

	if nlpResult.Distance != 0 {

		go svc.saveToNlpTrainingLogs(&nlpResult, 1)
	}
	return nlpResult
}

// saveNlpTrainingSetsService saveNlpTrainingSetsService
func (svc Service) saveToNlpTrainingLogs(nlpResult *dao.ReadNlpReplyDao, shopID uint) {
	var nlpTraningRecordDomain domains.NlpTrainingLogDomain
	nlpTraningRecordDomain.Keyword = nlpResult.Keyword
	nlpTraningRecordDomain.KeywordMinhash = distance.GenerateKeywordMinhash(nlpResult.Keyword)
	nlpTraningRecordDomain.Intent = nlpResult.Intent
	nlpTraningRecordDomain.Distance = nlpResult.Distance
	nlpTraningRecordDomain.StoryID = nlpResult.StoryID
	svc.nlpTrainingRecordRepository.Save(&nlpTraningRecordDomain)
}
