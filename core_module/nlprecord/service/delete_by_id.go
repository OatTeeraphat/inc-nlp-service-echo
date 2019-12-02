package service

import (
	"fmt"
	"strconv"
)

// DeleteByID DeleteByID
func (svc Service) DeleteByID(id string) string {

	u64, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		fmt.Println(err)
	}
	nlpRecordID := uint(u64)

	svc.nlpRecordRepository.DeleteByID(nlpRecordID)

	return "OK"
}
