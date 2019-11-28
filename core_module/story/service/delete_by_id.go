package service

import (
	"fmt"
	"strconv"
)

// DeleteByID DeleteByID
func (s Service) DeleteByID(storyID string) string {

	u64, err := strconv.ParseUint(storyID, 10, 32)
	if err != nil {
		fmt.Println(err)
	}
	storyIDConverted := uint(u64)

	s.storyRepo.DeleteByID(storyIDConverted)

	return "OK"
}
