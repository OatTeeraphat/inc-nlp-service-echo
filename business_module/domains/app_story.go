package domains

import (
	"github.com/jinzhu/gorm"
)

// AppStoryDomain AppStoryDomain
type AppStoryDomain struct {
	gorm.Model
	AppID  uint32
	StoryID uint32
}

// TableName AppStoryDomain
func (AppStoryDomain) TableName() string {
	return "app_stories"
}
