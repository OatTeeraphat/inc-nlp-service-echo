package service

import (
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"inc-nlp-service-echo/core_module/nlptraininglog/dao"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceBulkDeleteByID(t *testing.T) {

	assert := assert.New(t)

	tests := []struct {
		name          string
		mockDeleteIDs dao.BulkDeleteByIDsDao
		expected      string
	}{
		// TODO: Add test cases.
		{
			name:          "ok case",
			mockDeleteIDs: dao.BulkDeleteByIDsDao{"0", "1"},
			expected:      "OK",
		},
	}
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpTrainingLogRepo := &mocks.INlpTrainingLogRepository{}
		mockNlpTrainingLogRepo.On("BulkDeleteByIDs", mock.Anything).Return(nil)
		service := NewService(mockNlpRecordRepo, mockNlpTrainingLogRepo)

		actual, _ := service.BulkDeleteByID(tt.mockDeleteIDs)

		assert.Equal(actual, tt.expected)

	}
}
