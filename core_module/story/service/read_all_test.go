package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/business_module/repositories/mocks"
	"inc-nlp-service-echo/core_module/story/dao"
	"testing"
	"time"

	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
)

func TestServiceReadAll(t *testing.T) {

	assert := assert.New(t)

	var TestCase = []struct {
		name            string
		mockStoryDomain []domains.StoryDomain
		expected        []dao.ReadStoryDao
	}{
		{
			name: "give story UUID format",
			mockStoryDomain: []domains.StoryDomain{
				{
					BaseDomain: domains.BaseDomain{
						ID:        uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
						CreatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
						UpdatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
					},
					AppID:       uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
					Name:        "name0",
					Description: "desc0",
				},
				{
					BaseDomain: domains.BaseDomain{
						ID:        uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
						CreatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
						UpdatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
					},
					AppID:       uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
					Name:        "name1",
					Description: "desc1",
				},
			},
			expected: []dao.ReadStoryDao{
				{
					ID:          "00000000-0000-0000-0000-000000000000",
					Name:        "name0",
					Description: "desc0",
					AppID:       "00000000-0000-0000-0000-000000000000",
					CreateAt:    -62169984000,
					UpdatedAt:   -62169984000,
				},
				{
					ID:          "00000000-0000-0000-0000-000000000000",
					Name:        "name1",
					Description: "desc1",
					AppID:       "00000000-0000-0000-0000-000000000000",
					CreateAt:    -62169984000,
					UpdatedAt:   -62169984000,
				},
			},
		},
	}

	for _, test := range TestCase {
		mockStoryRepo := &mocks.IStoryRepository{}
		service := NewService(mockStoryRepo)

		mockStoryRepo.On("FindAll").Return(test.mockStoryDomain)

		assert.Equal(service.ReadAll(), test.expected)

	}
}
