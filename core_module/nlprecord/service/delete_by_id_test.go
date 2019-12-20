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
		{name: "case ok", mockDeleteID: "00000000-0000-0000-0000-000000000000", expected: "OK"},
		{name: "case invalid", mockDeleteID: "00000000-0000-0000-0000-invalid", expected: "..."},
	}
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpRecordRepo.On("DeleteByID", mock.Anything).Return(nil)

		mockNlpTrainingLogRepository := &mocks.INlpTrainingLogRepository{}
		mockNlpDashboardRepository := &mocks.INlpDashboardRepository{}
		mockAppStoryRepository := &mocks.IAppStoryRepository{}
		svc := Service{
			nlpTrainingRecordRepository: mockNlpTrainingLogRepository,
			nlpRecordRepository:         mockNlpRecordRepo,
			nlpDashboardRepository:      mockNlpDashboardRepository,
			appStoryRepository:          mockAppStoryRepository,
		}
		actual := svc.DeleteByID(tt.mockDeleteID)
		assert.Equal(actual, tt.expected)
	}
}
