package domains

import (
	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/postgres"
)

// ShopDomain ShopDomain
type ShopDomain struct {
	gorm.Model
	Name           string
	Category       string
	FillchatUserID uint
	Channel        postgres.Jsonb
}

// TableName StoryDomain
func (ShopDomain) TableName() string {
	return "shops"
}
