package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"inc-nlp-service-echo/core_module/story/dao"
	"testing"
	"time"

	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServiceCreateOneStory(t *testing.T) {
	assert := assert.New(t)

	var TestCase = []struct {
		name                string
		expected            string
		mockStoryDAO        dao.NewStoryDao
		mockStoryFindByName domains.StoryDomain
		mockStorySave       domains.StoryDomain
	}{
		{
			name: "ok case",
			mockStoryDAO: dao.NewStoryDao{
				AppID:       "00000000-0000-0000-0000-000000000000",
				Name:        "name0",
				Description: "desc0",
			},
			mockStoryFindByName: domains.StoryDomain{},
			expected:            "OK",
		},
		{
			name: "invalid story name duplicate case",
			mockStoryDAO: dao.NewStoryDao{
				AppID:       "00000000-0000-0000-0000-000000000000",
				Name:        "name0",
				Description: "desc0",
			},
			mockStoryFindByName: domains.StoryDomain{
				BaseDomain: domains.BaseDomain{
					ID:        uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
					CreatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
					UpdatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
				},
				AppID:       uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
				Name:        "name0",
				Description: "desc0",
			},
			expected: "invalid",
		},
		{
			name: "invalid app id format",
			mockStoryDAO: dao.NewStoryDao{
				AppID:       "00000000-0000-0000-0000-invalid",
				Name:        "name0",
				Description: "desc0",
			},
			mockStoryFindByName: domains.StoryDomain{},
			expected:            "invalid",
		},
	}

	for _, test := range TestCase {
		mockStoryRepo := &mocks.IStoryRepository{}
		mockStoryRepo.On("FindByName", mock.Anything).Return(test.mockStoryFindByName)
		mockStoryRepo.On("Save", mock.Anything).Return(nil).Once()

		service := NewService(mockStoryRepo)

		actual := service.CreateOneStory(test.mockStoryDAO)

		assert.Equal(actual, test.expected)
	}

}
