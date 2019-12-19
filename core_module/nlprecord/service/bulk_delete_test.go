package service

import (
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestService_BulkDeleteByIDs(t *testing.T) {

	type stubs struct {
		nlpTrainingRecordRepository *mocks.INlpTrainingLogRepository
		nlpRecordRepository         *mocks.INlpRecordRepository
		nlpDashboardRepository      *mocks.INlpDashboardRepository
		appStoryRepository          *mocks.IAppStoryRepository
	}
	tests := []struct {
		name          string
		mockDeleteIDs []string
		expected      string
		stubs         stubs
	}{
		// TODO: Add test cases.
		{
			name:          "ok case",
			mockDeleteIDs: []string{"0", "1", "2"},
			expected:      "OK",
		},
	}

	assert := assert.New(t)
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpRecordRepo.On("BulkDeleteByIDs", mock.Anything).Return(nil)

		mockNlpTrainingLogRepository := &mocks.INlpTrainingLogRepository{}
		mockNlpDashboardRepository := &mocks.INlpDashboardRepository{}
		mockAppStoryRepository := &mocks.IAppStoryRepository{}

		svc := Service{
			nlpTrainingRecordRepository: mockNlpTrainingLogRepository,
			nlpRecordRepository:         mockNlpRecordRepo,
			nlpDashboardRepository:      mockNlpDashboardRepository,
			appStoryRepository:          mockAppStoryRepository,
		}

		actual, _ := svc.BulkDeleteByIDs(tt.mockDeleteIDs)

		assert.Equal(actual, tt.expected)

	}
}
