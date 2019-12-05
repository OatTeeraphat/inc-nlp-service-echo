package service

// BulkDeleteByIDs BulkDeleteByIDs
func (svc Service) BulkDeleteByIDs(ids []string) (string, error) {
	svc.nlpRecordRepository.BulkDeleteByIDs(ids)
	return "OK", nil
}
