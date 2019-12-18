// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	domains "inc-nlp-service-echo/business_module/domains"

	mock "github.com/stretchr/testify/mock"

	uuid "github.com/satori/go.uuid"
)

// IAppStoryRepository is an autogenerated mock type for the IAppStoryRepository type
type IAppStoryRepository struct {
	mock.Mock
}

// FindByAppID provides a mock function with given fields: appID
func (_m *IAppStoryRepository) FindByAppID(appID uuid.UUID) []domains.AppStoryDomain {
	ret := _m.Called(appID)

	var r0 []domains.AppStoryDomain
	if rf, ok := ret.Get(0).(func(uuid.UUID) []domains.AppStoryDomain); ok {
		r0 = rf(appID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]domains.AppStoryDomain)
		}
	}

	return r0
}

// Save provides a mock function with given fields: Domain
func (_m *IAppStoryRepository) Save(Domain *domains.AppStoryDomain) {
	_m.Called(Domain)
}
