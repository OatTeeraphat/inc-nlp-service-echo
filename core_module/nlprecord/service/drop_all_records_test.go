package service

import (
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceDropAllRecord(t *testing.T) {
	assert := assert.New(t)
	tests := []struct {
		name     string
		expected string
	}{
		// TODO: Add test cases.
		{name: "case OK", expected: "OK"},
	}
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpRecordRepo.On("Delete", mock.Anything).Return(nil)

		mockNlpTrainingLogRepository := &mocks.INlpTrainingLogRepository{}
		mockNlpDashboardRepository := &mocks.INlpDashboardRepository{}
		mockAppStoryRepository := &mocks.IAppStoryRepository{}
		svc := Service{
			nlpTrainingRecordRepository: mockNlpTrainingLogRepository,
			nlpRecordRepository:         mockNlpRecordRepo,
			nlpDashboardRepository:      mockNlpDashboardRepository,
			appStoryRepository:          mockAppStoryRepository,
		}

		actual := svc.DropAllRecord()
		assert.Equal(actual, tt.expected)
	}
}
