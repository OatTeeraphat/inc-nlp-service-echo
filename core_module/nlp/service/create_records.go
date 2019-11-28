package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlp/dao"
)

// CreateRecord CreateRecord
func (svc Service) CreateRecord(createNlpRecordDao []dao.CreateNlpRecordDao) string {

	for _, item := range createNlpRecordDao {
		hashValue := distance.GenerateKeywordMinhash(item.Keyword)

		var nlpRecordDomain domains.NlpRecordDomain
		nlpRecordDomain.Keyword = item.Keyword
		nlpRecordDomain.KeywordMinhash = hashValue
		nlpRecordDomain.Intent = item.Intent

		svc.nlpRecordRepository.Save(&nlpRecordDomain)
	}
	return "OK"
}
