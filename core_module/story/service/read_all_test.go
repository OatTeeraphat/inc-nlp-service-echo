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

func TestService_ReadAll(t *testing.T) {

	mock := new(MockRepository)
	domain := []domains.StoryDomain{}
	for i := 0; i < 1; i++ {
		item := domains.StoryDomain{}
		item.ID = uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000")
		item.AppID = uuid.FromStringOrNil("00000000-0000-0000-0000-000000000000")
		item.CreatedAt = time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC)
		item.UpdatedAt = time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC)
		item.Name = "name" + string(i)
		item.Description = "desc" + string(i)
		domain = append(domain, item)
	}
	mock.On("FindAll").Return(domain)

	service := NewService(mock)

	actual := service.ReadAll()
	expected := []dao.ReadStoryDao{
		{
			ID:          "00000000-0000-0000-0000-000000000000",
			Name:        "name\x00",
			Description: "desc\x00",
			AppID:       "00000000-0000-0000-0000-000000000000",
			CreateAt:    -62169984000,
			UpdatedAt:   -62169984000,
		},
	}

	assert := assert.New(t)
	assert.Equal(actual, expected)
}
