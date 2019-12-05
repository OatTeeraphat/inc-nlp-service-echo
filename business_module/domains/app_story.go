package domains

import uuid "github.com/satori/go.uuid"

// AppStoryDomain AppStoryDomain
type AppStoryDomain struct {
	BaseDomain
	AppID   uuid.UUID
	StoryID uuid.UUID
}

// TableName AppStoryDomain
func (AppStoryDomain) TableName() string {
	return "app_stories"
}
