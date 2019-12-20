package service

import (
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"inc-nlp-service-echo/core_module/nlprecord/dao"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceUpdateByIDAndClientID(t *testing.T) {
	assert := assert.New(t)
	tests := []struct {
		name               string
		updateNlpRecordDao dao.UpdateNlpRecordDao
		expected           string
	}{
		// TODO: Add test cases.
		{
			name: "case ok",
			updateNlpRecordDao: dao.UpdateNlpRecordDao{
				ID:        "00000000-0000-0000-0000-000000000000",
				Keyword:   "0",
				Intent:    "0",
				StoryName: "0",
			},
			expected: "OK",
		},
		{
			name:               "case invalid",
			updateNlpRecordDao: dao.UpdateNlpRecordDao{},
			expected:           "...",
		},
	}
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpRecordRepo.On("UpdateByID", mock.Anything).Return(nil)

		mockNlpTrainingLogRepository := &mocks.INlpTrainingLogRepository{}
		mockNlpDashboardRepository := &mocks.INlpDashboardRepository{}
		mockAppStoryRepository := &mocks.IAppStoryRepository{}
		svc := Service{
			nlpTrainingRecordRepository: mockNlpTrainingLogRepository,
			nlpRecordRepository:         mockNlpRecordRepo,
			nlpDashboardRepository:      mockNlpDashboardRepository,
			appStoryRepository:          mockAppStoryRepository,
		}

		actual := svc.UpdateByIDAndClientID(tt.updateNlpRecordDao)

		assert.Equal(actual, tt.expected)
	}
}
