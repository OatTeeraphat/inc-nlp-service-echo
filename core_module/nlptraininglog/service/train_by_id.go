package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/domains"

	uuid "github.com/satori/go.uuid"
)

// TrainByID TrainByID
func (s Service) TrainByID(ID string) (string, error) {

	u2, err := uuid.FromString(ID)
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
	}

	domain := s.nlpTrainingLogRepository.FindByID(u2)

	var nlpRecordDomain domains.NlpRecordDomain

	nlpRecordDomain.Intent = domain.Intent
	nlpRecordDomain.Keyword = domain.Keyword
	nlpRecordDomain.KeywordMinhash = domain.KeywordMinhash
	nlpRecordDomain.StoryID = domain.StoryID

	s.nlpRecordRepository.Save(&nlpRecordDomain)

	s.nlpTrainingLogRepository.DeleteByID(u2)

	return "OK", nil
}
