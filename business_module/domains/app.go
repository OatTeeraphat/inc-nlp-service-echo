package domains

import (
	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/postgres"
)

// AppDomain AppDomain
type AppDomain struct {
	gorm.Model
	Name     string
	Category string
	ClientID uint
	Channel  postgres.Jsonb
}

// TableName StoryDomain
func (AppDomain) TableName() string {
	return "apps"
}
