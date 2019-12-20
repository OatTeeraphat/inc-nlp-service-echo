package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"inc-nlp-service-echo/core_module/nlprecord/dao"
	"testing"

	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceReadByStoryIDs(t *testing.T) {
	assert := assert.New(t)
	tests := []struct {
		name                     string
		mockPage                 string
		mockStoryID              string
		mockCountByStoryIDs      int64
		mockPaginationByStoryIDs []domains.NlpRecordDomain
		expected                 dao.ReadNlpRecordByStoryIDsResponse
	}{
		// TODO: Add test cases.
		{
			name:                "case ok",
			mockPage:            "1",
			mockStoryID:         "1,2,3",
			mockCountByStoryIDs: 2,
			mockPaginationByStoryIDs: []domains.NlpRecordDomain{
				{
					Keyword:        "0",
					KeywordMinhash: 0,
					Intent:         "0",
					StoryID:        uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
					AppID:          uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
				},
				{
					Keyword:        "1",
					KeywordMinhash: 1,
					Intent:         "1",
					StoryID:        uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
					AppID:          uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
				},
			},
			expected: dao.ReadNlpRecordByStoryIDsResponse{
				Page:  "1",
				Limit: "50",
				Total: "1",
				NLPRecord: []dao.NlpRecord{
					{
						ID:        "00000000-0000-0000-0000-000000000000",
						Keyword:   "0",
						Intent:    "0",
						UpdatedAt: "0001-01-01 00:00:00 +0000 UTC",
					},
					{
						ID:        "00000000-0000-0000-0000-000000000000",
						Keyword:   "1",
						Intent:    "1",
						UpdatedAt: "0001-01-01 00:00:00 +0000 UTC",
					},
				},
			},
		},
	}
	for _, tt := range tests {
		mockNlpRecordRepo := &mocks.INlpRecordRepository{}
		mockNlpRecordRepo.On("CountByStoryIDs", mock.Anything).Return(tt.mockCountByStoryIDs)
		mockNlpRecordRepo.On("PaginationByStoryIDs", mock.Anything, mock.Anything, mock.Anything).Return(tt.mockPaginationByStoryIDs)
		mockNlpTrainingLogRepository := &mocks.INlpTrainingLogRepository{}
		mockNlpDashboardRepository := &mocks.INlpDashboardRepository{}
		mockAppStoryRepository := &mocks.IAppStoryRepository{}

		svc := Service{
			nlpTrainingRecordRepository: mockNlpTrainingLogRepository,
			nlpRecordRepository:         mockNlpRecordRepo,
			nlpDashboardRepository:      mockNlpDashboardRepository,
			appStoryRepository:          mockAppStoryRepository,
		}

		actual := svc.ReadByStoryIDs(tt.mockPage, tt.mockStoryID)
		assert.Equal(actual, tt.expected)
	}
}
