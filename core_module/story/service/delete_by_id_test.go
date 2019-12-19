package service

import (
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceDeleteByID(t *testing.T) {

	assert := assert.New(t)

	var TestCase = []struct {
		name           string
		mockDeleteByID string
		expected       string
	}{
		{name: "give story UUID format", mockDeleteByID: "00000000-0000-0000-0000-000000000000", expected: "OK"},
		{name: "give story other format", mockDeleteByID: "00000000-0000-0000-0000", expected: "..."},
	}

	for _, test := range TestCase {
		mockStoryRepo := &mocks.IStoryRepository{}
		mockStoryRepo.On("DeleteByID", mock.Anything).Return(nil)

		service := NewService(mockStoryRepo)

		actual := service.DeleteByID(test.mockDeleteByID)

		assert.Equal(actual, test.expected)
	}

}
