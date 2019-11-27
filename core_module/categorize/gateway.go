package categorize

import "github.com/labstack/echo/v4"

// HTTPGateway story rest api interface
type HTTPGateway interface {
	CreateShopStoryController(e echo.Context) error
}
