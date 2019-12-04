package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/computing_module/distance"
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	"github.com/labstack/gommon/log"
	uuid "github.com/satori/go.uuid"
)

// UpdateByIDAndClientID UpdateByIDAndClientID
func (svc Service) UpdateByIDAndClientID(updateNlpRecordDao dao.UpdateNlpRecordDao) string {
	var domain domains.NlpRecordDomain

	// i64, err := strconv.ParseInt(updateNlpRecordDao.ID, 10, 32)

	// if err != nil {
	// 	log.Error("parse ID error")
	// }

	u2, err := uuid.FromString(updateNlpRecordDao.ID)
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return "..."
	}

	domain.ID = u2
	domain.Keyword = updateNlpRecordDao.Keyword
	domain.KeywordMinhash = distance.GenerateKeywordMinhash(updateNlpRecordDao.Keyword)
	domain.Intent = updateNlpRecordDao.Intent
	domain.StoryID = uuid.NewV4()

	log.Info(domain)

	svc.nlpRecordRepository.UpdateByID(&domain)

	return "OK"
}
