// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	domains "inc-nlp-service-echo/business_module/domains"

	gorm "github.com/jinzhu/gorm"

	mock "github.com/stretchr/testify/mock"

	uuid "github.com/satori/go.uuid"
)

// IStoryRepository is an autogenerated mock type for the IStoryRepository type
type IStoryRepository struct {
	mock.Mock
}

// DeleteByID provides a mock function with given fields: ID
func (_m *IStoryRepository) DeleteByID(ID uuid.UUID) *gorm.DB {
	ret := _m.Called(ID)

	var r0 *gorm.DB
	if rf, ok := ret.Get(0).(func(uuid.UUID) *gorm.DB); ok {
		r0 = rf(ID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*gorm.DB)
		}
	}

	return r0
}

// FindAll provides a mock function with given fields:
func (_m *IStoryRepository) FindAll() []domains.StoryDomain {
	ret := _m.Called()

	var r0 []domains.StoryDomain
	if rf, ok := ret.Get(0).(func() []domains.StoryDomain); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]domains.StoryDomain)
		}
	}

	return r0
}

// FindByName provides a mock function with given fields: storyName
func (_m *IStoryRepository) FindByName(storyName string) domains.StoryDomain {
	ret := _m.Called(storyName)

	var r0 domains.StoryDomain
	if rf, ok := ret.Get(0).(func(string) domains.StoryDomain); ok {
		r0 = rf(storyName)
	} else {
		r0 = ret.Get(0).(domains.StoryDomain)
	}

	return r0
}

// Save provides a mock function with given fields: Domain
func (_m *IStoryRepository) Save(Domain *domains.StoryDomain) {
	_m.Called(Domain)
}
