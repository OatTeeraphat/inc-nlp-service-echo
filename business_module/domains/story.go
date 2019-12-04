package domains

import (
	"github.com/jinzhu/gorm"
)

// StoryDomain StoryDomain
type StoryDomain struct {
	gorm.Model
	Name        string
	Description string
	Owner       string // staff, specific shop
}

// TableName StoryDomain
func (StoryDomain) TableName() string {
	return "stories"
}
