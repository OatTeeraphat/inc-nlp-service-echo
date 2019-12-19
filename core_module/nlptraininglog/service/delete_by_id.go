package service

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

// DeleteByID DeleteByID
func (s Service) DeleteByID(ID string) (string, error) {

	u2, err := uuid.FromString(ID)
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return "ERROR", err
	}

	s.nlpTrainingLogRepository.DeleteByID(u2)

	return "OK", nil
}
