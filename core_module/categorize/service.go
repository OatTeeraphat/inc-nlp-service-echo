package categorize

// IShopStoryService IShopStoryService
type IShopStoryService interface {
	CreateShopStoryService(shopID string, storyIDs []string) string
}
