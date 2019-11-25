package categorize

import "github.com/labstack/echo/v4"

// IShopStoryController story rest api interface
type IShopStoryController interface {
	CreateShopStoryController(e echo.Context) error
}
