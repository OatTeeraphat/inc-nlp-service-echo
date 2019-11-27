package categorize

// Service IShopStoryService
type Service interface {
	CreateShopStoryService(shopID string, storyIDs []string) string
}
