package service

// DropAllRecord DropAllRecord
func (svc Service) DropAllRecord() string {
	svc.nlpRecordRepository.Delete()
	return "OK"
}
