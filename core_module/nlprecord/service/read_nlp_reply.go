package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	"github.com/labstack/gommon/log"
	uuid "github.com/satori/go.uuid"
)

// ReadNlpReply ReadNlpReply
func (svc Service) ReadNlpReply(keyword string, appID string) dao.ReadNlpReplyDao {
	var readNlpReplyDao []dao.ReadNlpReplyDao
	// var listStoryIDsInAppFound []uuid.UUID
	var keywordMinhash uint32

	if keyword == "" {
		log.Fatal("no keyword")
	}

	keywordMinhash = distance.GenerateKeywordMinhash(keyword)

	// appStoryDomainFoundByAppID := svc.appStoryRepository.FindByAppID(1)

	// for _, item := range appStoryDomainFoundByAppID {

	// 	listStoryIDsInAppFound = append(listStoryIDsInAppFound, item.StoryID)
	// }

	nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhash(keywordMinhash)
	// nlpFindByKeyword := svc.nlpRecordRepository.FindByKeywordMinhashAndStoryID(keywordMinhash, listStoryIDsInAppFound)

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
		eachNlpModel := dao.ReadNlpReplyDao{Keyword: item.Keyword, Intent: item.Intent, StoryID: uuid.NewV4().String()}
		eachNlpModel.Keyword = item.Keyword
		eachNlpModel.Intent = item.Intent
		eachNlpModel.StoryID = item.StoryID.String()
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
	u2, err := uuid.FromString(nlpResult.StoryID)

	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
	}

	domain.StoryID = u2
	svc.nlpDashboardRepository.Save(&domain)

}

// saveNlpTrainingSetsService saveNlpTrainingSetsService
func (svc Service) saveToNlpTrainingLogs(nlpResult *dao.ReadNlpReplyDao, appID uint) {
	var domain domains.NlpTrainingLogDomain
	domain.Keyword = nlpResult.Keyword
	domain.KeywordMinhash = distance.GenerateKeywordMinhash(nlpResult.Keyword)
	domain.Intent = nlpResult.Intent
	domain.Distance = nlpResult.Distance
	u2, err := uuid.FromString(nlpResult.StoryID)

	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
	}

	domain.StoryID = u2
	svc.nlpTrainingRecordRepository.Save(&domain)
}
