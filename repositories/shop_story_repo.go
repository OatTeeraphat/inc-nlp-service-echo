package repositories

import (
	"inc-nlp-service-echo/datasources"
	"inc-nlp-service-echo/domains"
)

// ShopStoryRepository shop story mapping
type ShopStoryRepository struct {
	*datasources.FillChatGORM
}

// IShopStoryRepository shop story mapping interface
type IShopStoryRepository interface {
	Save(shopStoryDomain *domains.ShopStoryDomain)
	FindByShopID(shopID uint32) []domains.ShopStoryDomain
}

// NewShopStoryRepository shop story mapping instance
func NewShopStoryRepository(data *datasources.FillChatGORM) IShopStoryRepository {
	return &ShopStoryRepository{data}
}

// Save find similar shop ids
func (repo *ShopStoryRepository) Save(shopStoryDomain *domains.ShopStoryDomain) {
	repo.DB.Create(&shopStoryDomain)
}

// FindByShopID find similar shop ids
func (repo *ShopStoryRepository) FindByShopID(shopID uint32) []domains.ShopStoryDomain {
	var shopStoryDomain []domains.ShopStoryDomain
	repo.DB.Where(&domains.ShopStoryDomain{StoryID: shopID}).Find(&shopStoryDomain)
	return shopStoryDomain
}
