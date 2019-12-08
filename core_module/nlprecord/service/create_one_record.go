package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	uuid "github.com/satori/go.uuid"
)

// CreateOneRecord CreateOneRecord
func (svc Service) CreateOneRecord(createNlpRecordDao dao.CreateNlpRecordDao) dao.CreateNlpResponse {

	var nlpRecordDomain domains.NlpRecordDomain
	nlpRecordDomain.Keyword = createNlpRecordDao.Keyword
	keywordMinhash := distance.GenerateKeywordMinhash(createNlpRecordDao.Keyword)
	nlpRecordDomain.KeywordMinhash = keywordMinhash
	nlpRecordDomain.Intent = createNlpRecordDao.Intent
	nlpRecordDomain.StoryID = uuid.NewV4()

	svc.nlpRecordRepository.Save(&nlpRecordDomain)

	var createNlpResponse dao.CreateNlpResponse

	createNlpResponse.ID = nlpRecordDomain.ID.String()
	createNlpResponse.Keyword = nlpRecordDomain.Keyword
	createNlpResponse.Intent = nlpRecordDomain.Intent
	createNlpResponse.UpdatedAt = nlpRecordDomain.UpdatedAt.String()
	createNlpResponse.StoryName = nlpRecordDomain.StoryID.String()

	return createNlpResponse
}
