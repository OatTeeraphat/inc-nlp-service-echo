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
	Save(shopStoryDomain *domains.ShopStoryDomain)
	FindByShopID(shopID uint32) []domains.ShopStoryDomain
}

// NewShopStoryRepository shop story mapping instance
func NewShopStoryRepository(data *gorm.DB) IShopStoryRepository {
	return &ShopStoryRepository{data}
}

// Save find similar shop ids
func (repo *ShopStoryRepository) Save(shopStoryDomain *domains.ShopStoryDomain) {
	repo.Datasources.Create(&shopStoryDomain)
}

// FindByShopID find similar shop ids
func (repo *ShopStoryRepository) FindByShopID(shopID uint32) []domains.ShopStoryDomain {
	var shopStoryDomain []domains.ShopStoryDomain
	repo.Datasources.Where(&domains.ShopStoryDomain{StoryID: shopID}).Find(&shopStoryDomain)
	return shopStoryDomain
}
