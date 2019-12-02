package categorize

import "github.com/labstack/echo/v4"

// HTTPGateway story rest api interface
type HTTPGateway interface {
	CreateRecord(e echo.Context) error
}

// Service IShopStoryService
type Service interface {
	CreateRecord(shopID string, storyIDs []string) string
}
