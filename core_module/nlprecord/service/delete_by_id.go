package service

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

// DeleteByID DeleteByID
func (svc Service) DeleteByID(id string) string {

	u2, err := uuid.FromString(id)
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return "..."
	}

	svc.nlpRecordRepository.DeleteByID(u2)

	return "OK"
}
