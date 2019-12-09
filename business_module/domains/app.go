package domains

import (
	uuid "github.com/satori/go.uuid"
)

// AppDomain AppDomain
type AppDomain struct {
	BaseDomain
	Name     string
	Category string
	ClientID uuid.UUID
	// Channel  postgres.Jsonb
}

// TableName StoryDomain
func (AppDomain) TableName() string {
	return "apps"
}
