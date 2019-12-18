package service

import (
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"testing"

	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
)

func TestServiceDeleteByID(t *testing.T) {

	assert := assert.New(t)

	var TestCase = []struct {
		Name     string
		Input    string
		Expected string
	}{
		{Name: "give story UUID format", Input: "00000000-0000-0000-0000-000000000000", Expected: "OK"},
		{Name: "give story other format", Input: "00000000-0000-0000-0000", Expected: "..."},
	}

	for _, test := range TestCase {
		mockStoryRepo := &mocks.IStoryRepository{}
		mockStoryRepo.On("DeleteByID", uuid.FromStringOrNil(test.Input)).Return(nil)

		service := NewService(mockStoryRepo)

		assert.Equal(service.DeleteByID(test.Input), test.Expected)
	}

}
