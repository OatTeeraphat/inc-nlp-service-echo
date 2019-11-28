package service

// BulkDeleteByID BulkDeleteByID
func (s Service) BulkDeleteByID(IDs []uint) (string, error) {

	s.nlpTrainingLogRepository.BulkDeleteByIDs(IDs)

	return "OK", nil
}
