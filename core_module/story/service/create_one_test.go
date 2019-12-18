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

func TestServiceCreateOneStory(t *testing.T) {
	assert := assert.New(t)

	var TestCase = []struct {
		Name                string
		Input               string
		Expected            string
		MockStoryDAO        dao.NewStoryDao
		MockStoryFindByName domains.StoryDomain
		MockStorySave       domains.StoryDomain
	}{
		{
			Name: "ok case",
			MockStoryDAO: dao.NewStoryDao{
				AppID:       "00000000-0000-0000-0000-000000000000",
				Name:        "name0",
				Description: "desc0",
			},
			MockStoryFindByName: domains.StoryDomain{},
			MockStorySave: domains.StoryDomain{
				Name:        "name0",
				Description: "desc0",
			},
			Expected: "OK",
		},
		{
			Name: "invalid story name duplicate case",
			MockStoryDAO: dao.NewStoryDao{
				AppID:       "00000000-0000-0000-0000-000000000000",
				Name:        "name0",
				Description: "desc0",
			},
			MockStoryFindByName: domains.StoryDomain{
				BaseDomain: domains.BaseDomain{
					ID:        uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
					CreatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
					UpdatedAt: time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
				},
				AppID:       uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000"),
				Name:        "name0",
				Description: "desc0",
			},
			MockStorySave: domains.StoryDomain{},
			Expected:      "invalid",
		},
		{
			Name: "invalid app id format",
			MockStoryDAO: dao.NewStoryDao{
				AppID:       "00000000-0000-0000-0000-invalid",
				Name:        "name0",
				Description: "desc0",
			},
			MockStoryFindByName: domains.StoryDomain{},
			MockStorySave: domains.StoryDomain{
				Name:        "name0",
				Description: "desc0",
			},
			Expected: "invalid",
		},
	}

	for _, test := range TestCase {
		mockStoryRepo := &mocks.IStoryRepository{}
		mockStoryRepo.On("FindByName", "name0").Return(test.MockStoryFindByName)
		mockStoryRepo.On("Save", &test.MockStorySave).Return(nil)

		service := NewService(mockStoryRepo)

		actual := service.CreateOneStory(test.MockStoryDAO)

		assert.Equal(actual, test.Expected)
	}

}
