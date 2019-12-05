package service

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

// DeleteByID DeleteByID
func (s Service) DeleteByID(storyID string) string {

	u2, err := uuid.FromString(storyID)
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
		return "..."
	}

	s.storyRepo.DeleteByID(u2)

	return "OK"
}
