package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	"github.com/labstack/gommon/log"
)

// ReadNlpReply ReadNlpReply
func (svc Service) ReadNlpReply(keyword string, appID string) dao.ReadNlpReplyDao {
	var readNlpReplyDao []dao.ReadNlpReplyDao
	var listStoryIDsInAppFound []uint32
	var keywordMinhash uint32

	if keyword == "" {
		log.Fatal("no keyword")
	}

	keywordMinhash = distance.GenerateKeywordMinhash(keyword)

	appStoryDomainFoundByAppID := svc.appStoryRepository.FindByAppID(1)

	for _, item := range appStoryDomainFoundByAppID {
		listStoryIDsInAppFound = append(listStoryIDsInAppFound, item.StoryID)
	}

	// nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhash(hashValue)
	nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhashAndStoryID(keywordMinhash, listStoryIDsInAppFound)

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

	go svc.saveToNlpDashboard(&nlpResult, 1)

	return nlpResult
}

func (svc Service) saveToNlpDashboard(nlpResult *dao.ReadNlpReplyDao, appID uint) {
	var domain domains.NlpDashboardDomain
	domain.Keyword = nlpResult.Keyword
	domain.KeywordMinhash = distance.GenerateKeywordMinhash(nlpResult.Keyword)
	domain.Intent = nlpResult.Intent
	domain.Distance = nlpResult.Distance
	domain.StoryID = nlpResult.StoryID
	svc.nlpDashboardRepository.Save(&domain)

}

// saveNlpTrainingSetsService saveNlpTrainingSetsService
func (svc Service) saveToNlpTrainingLogs(nlpResult *dao.ReadNlpReplyDao, appID uint) {
	var domain domains.NlpTrainingLogDomain
	domain.Keyword = nlpResult.Keyword
	domain.KeywordMinhash = distance.GenerateKeywordMinhash(nlpResult.Keyword)
	domain.Intent = nlpResult.Intent
	domain.Distance = nlpResult.Distance
	domain.StoryID = nlpResult.StoryID
	svc.nlpTrainingRecordRepository.Save(&domain)
}
