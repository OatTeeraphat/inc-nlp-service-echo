// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	domains "inc-nlp-service-echo/business_module/domains"

	gorm "github.com/jinzhu/gorm"

	mock "github.com/stretchr/testify/mock"

	uuid "github.com/satori/go.uuid"
)

// INlpDashboardRepository is an autogenerated mock type for the INlpDashboardRepository type
type INlpDashboardRepository struct {
	mock.Mock
}

// FindByID provides a mock function with given fields: ID
func (_m *INlpDashboardRepository) FindByID(ID uuid.UUID) domains.NlpDashboardDomain {
	ret := _m.Called(ID)

	var r0 domains.NlpDashboardDomain
	if rf, ok := ret.Get(0).(func(uuid.UUID) domains.NlpDashboardDomain); ok {
		r0 = rf(ID)
	} else {
		r0 = ret.Get(0).(domains.NlpDashboardDomain)
	}

	return r0
}

// FindGreaterThanByID provides a mock function with given fields: ID
func (_m *INlpDashboardRepository) FindGreaterThanByID(ID uuid.UUID) []domains.NlpDashboardDomain {
	ret := _m.Called(ID)

	var r0 []domains.NlpDashboardDomain
	if rf, ok := ret.Get(0).(func(uuid.UUID) []domains.NlpDashboardDomain); ok {
		r0 = rf(ID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]domains.NlpDashboardDomain)
		}
	}

	return r0
}

// Save provides a mock function with given fields: Domain
func (_m *INlpDashboardRepository) Save(Domain *domains.NlpDashboardDomain) *gorm.DB {
	ret := _m.Called(Domain)

	var r0 *gorm.DB
	if rf, ok := ret.Get(0).(func(*domains.NlpDashboardDomain) *gorm.DB); ok {
		r0 = rf(Domain)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*gorm.DB)
		}
	}

	return r0
}