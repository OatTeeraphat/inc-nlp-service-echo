package domains

import uuid "github.com/satori/go.uuid"

type StoryDomain struct {
	BaseDomain
	Name        string
	Description string
	AppID       uuid.UUID // staff, specific app
}

// TableName StoryDomain
func (StoryDomain) TableName() string {
	return "stories"
}
