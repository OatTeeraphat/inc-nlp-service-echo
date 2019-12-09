package service

import (
	"inc-nlp-service-echo/core_module/nlptraininglog/dao"
)

// BulkDeleteByID BulkDeleteByID
func (s Service) BulkDeleteByID(IDs dao.BulkDeleteByIDsDao) (string, error) {
	var UUIDs dao.BulkDeleteByIDsDao

	for _, item := range IDs {
		UUIDs = append(UUIDs, item)
	}

	s.nlpTrainingLogRepository.BulkDeleteByIDs(UUIDs)

	return "OK", nil
}
