package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceTrainByID(t *testing.T) {
	assert := assert.New(t)

	tests := []struct {
		name         string
		mockTrainID  string
		mockFindByID domains.NlpTrainingLogDomain
		expected     string
	}{
		// TODO: Add test cases.
		{
			name:        "ok case",
			mockTrainID: "00000000-0000-0000-0000-000000000000",
			expected:    "OK",
		},
		{
			name:        "invalid uuid case",
			mockTrainID: "00000000-0000-0000-0000-invalid",
			expected:    "nil got",
		},
	}
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpTrainingLogRepo := &mocks.INlpTrainingLogRepository{}

		mockNlpRecordRepo.On("Save", mock.Anything).Return(nil)
		mockNlpTrainingLogRepo.On("FindByID", mock.Anything).Return(tt.mockFindByID)
		mockNlpTrainingLogRepo.On("DeleteByID", mock.Anything).Return(nil)

		service := NewService(mockNlpRecordRepo, mockNlpTrainingLogRepo)
		actual, _ := service.TrainByID(tt.mockTrainID)

		assert.Equal(actual, tt.expected)
	}
}
