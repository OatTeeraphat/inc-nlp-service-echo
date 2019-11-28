package service

import "strconv"

// DeleteByID DeleteByID
func (s Service) DeleteByID(ID string) (string, error) {
	u64, err := strconv.ParseUint(ID, 10, 32)
	if err != nil {
		return "INVALID", err
	}

	domainID := uint(u64)

	s.nlpTrainingLogRepository.DeleteByID(domainID)

	return "OK", nil
}
