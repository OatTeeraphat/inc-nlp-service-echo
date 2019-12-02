package service

import "inc-nlp-service-echo/core_module/nlptraininglog/dao"

// BulkDeleteByID BulkDeleteByID
func (s Service) BulkDeleteByID(IDs dao.BulkDeleteByIDsDao) (string, error) {

	s.nlpTrainingLogRepository.BulkDeleteByIDs(IDs)

	return "OK", nil
}
