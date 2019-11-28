package service

// BulkDeleteByIDs BulkDeleteByIDs
func (svc Service) BulkDeleteByIDs(ids []uint) (string, error) {

	var idsForDelete []uint

	for _, id := range ids {
		idsForDelete = append(idsForDelete, id)
	}

	go svc.nlpRecordRepository.BulkDeleteByIDs(idsForDelete)

	return "OK", nil
}
