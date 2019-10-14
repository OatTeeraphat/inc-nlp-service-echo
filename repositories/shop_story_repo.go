package repositories

import (
	"inc-nlp-service-echo/domains"

	"github.com/jinzhu/gorm"
)

// ShopStoryRepository shop story mapping
type ShopStoryRepository struct {
	Datasources *gorm.DB
}

// IShopStoryRepository shop story mapping interface
type IShopStoryRepository interface {
	FindByShopID(shopID uint32) []domains.ShopStoryDomain
}

// NewShopStoryRepository shop story mapping instance
func NewShopStoryRepository(data *gorm.DB) IShopStoryRepository {
	return &ShopStoryRepository{data}
}

// FindByShopID find similar shop ids
func (repo *ShopStoryRepository) FindByShopID(shopID uint32) []domains.ShopStoryDomain {
	var shopStoryDomain []domains.ShopStoryDomain
	repo.Datasources.Where(&domains.ShopStoryDomain{StoryID: shopID}).Find(&shopStoryDomain)
	return shopStoryDomain
}
