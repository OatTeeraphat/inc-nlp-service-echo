package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/core_module/story/dao"
	"testing"
	"time"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockRepository struct {
	mock.Mock
}

func (m *MockRepository) Save(Domain *domains.StoryDomain) {
}
func (m *MockRepository) FindAll() []domains.StoryDomain {
	args := m.Called()
	return args.Get(0).([]domains.StoryDomain)
}
func (m *MockRepository) FindByName(storyName string) domains.StoryDomain {
	args := m.Called(storyName)
	return args.Get(0).(domains.StoryDomain)
}
func (m *MockRepository) DeleteByID(ID uuid.UUID) *gorm.DB {
	args := m.Called(ID)
	return args.Get(0).(*gorm.DB)
}

func TestServiceReadAll(t *testing.T) {

	mock := new(MockRepository)

	var domain []domains.StoryDomain

	item0 := domains.StoryDomain{}
	item0.ID = uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000")
	item0.AppID = uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000")
	item0.CreatedAt = time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC)
	item0.UpdatedAt = time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC)
	item0.Name = "name0"
	item0.Description = "desc0"

	item1 := domains.StoryDomain{}
	item1.ID = uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000")
	item1.AppID = uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000")
	item1.CreatedAt = time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC)
	item1.UpdatedAt = time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC)
	item1.Name = "name1"
	item1.Description = "desc1"

	domain = append(domain, item0)
	domain = append(domain, item1)

	mock.On("FindAll").Return(domain)

	service := NewService(mock)

	actual := service.ReadAll()
	expected := []dao.ReadStoryDao{
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
	}

	assert := assert.New(t)
	assert.Equal(actual, expected)
}
