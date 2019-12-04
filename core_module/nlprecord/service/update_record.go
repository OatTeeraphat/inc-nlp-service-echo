package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	"github.com/labstack/gommon/log"
)

// UpdateByIDAndClientID UpdateByIDAndClientID
func (svc Service) UpdateByIDAndClientID(updateNlpRecordDao dao.UpdateNlpRecordDao) string {
	var domain domains.NlpRecordDomain

	// i64, err := strconv.ParseInt(updateNlpRecordDao.ID, 10, 32)

	// if err != nil {
	// 	log.Error("parse ID error")
	// }

	domain.ID = updateNlpRecordDao.ID
	domain.Keyword = updateNlpRecordDao.Keyword
	domain.KeywordMinhash = distance.GenerateKeywordMinhash(updateNlpRecordDao.Keyword)
	domain.Intent = updateNlpRecordDao.Intent
	domain.StoryID = 9

	log.Info(domain)

	svc.nlpRecordRepository.UpdateByID(&domain)

	return "OK"
}
