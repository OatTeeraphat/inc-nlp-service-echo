package service

import (
	"fmt"
	"inc-nlp-service-echo/core_module/nlptraininglog/dao"

	uuid "github.com/satori/go.uuid"
)

// BulkDeleteByID BulkDeleteByID
func (s Service) BulkDeleteByID(IDs dao.BulkDeleteByIDsDao) (string, error) {
	var UUIDs []uuid.UUID

	for _, item := range IDs {
		u2, err := uuid.FromString(item)
		if err != nil {
			fmt.Printf("Something went wrong: %s", err)
		}

		UUIDs = append(UUIDs, u2)
	}

	s.nlpTrainingLogRepository.BulkDeleteByIDs(UUIDs)

	return "OK", nil
}
