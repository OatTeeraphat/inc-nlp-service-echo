package service

import (
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceDeleteByID(t *testing.T) {
	assert := assert.New(t)

	tests := []struct {
		name         string
		mockDeleteID string
		expected     string
	}{
		// TODO: Add test cases.
		{
			name:         "ok case",
			mockDeleteID: "00000000-0000-0000-0000-000000000000",
			expected:     "OK",
		},
		{
			name:         "invalid uuid case",
			mockDeleteID: "00000000-0000-0000-0000-invalid",
			expected:     "ERROR",
		},
	}
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpTrainingLogRepo := &mocks.INlpTrainingLogRepository{}
		mockNlpTrainingLogRepo.On("DeleteByID", mock.Anything).Return(nil)
		service := NewService(mockNlpRecordRepo, mockNlpTrainingLogRepo)

		actual, _ := service.DeleteByID(tt.mockDeleteID)

		assert.Equal(actual, tt.expected)
	}
}
