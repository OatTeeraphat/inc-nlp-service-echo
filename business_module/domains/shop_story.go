package domains

import (
	"github.com/jinzhu/gorm"
)

// ShopStoryDomain ShopStoryDomain
type ShopStoryDomain struct {
	gorm.Model
	ShopID  uint32
	StoryID uint32
}

// TableName ShopStoryDomain
func (ShopStoryDomain) TableName() string {
	return "shop_stories"
}
