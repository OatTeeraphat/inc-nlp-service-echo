package categorize

import "github.com/labstack/echo/v4"

// HTTPGateway story rest api interface
type HTTPGateway interface {
	CreateRecord(e echo.Context) error
}

// Service IAppStoryService
type Service interface {
	CreateRecord(appID string, storyIDs []string) string
}
