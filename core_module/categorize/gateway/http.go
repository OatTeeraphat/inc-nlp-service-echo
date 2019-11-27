package gateway

import (
	"inc-nlp-service-echo/core_module/categorize"
	"net/http"

	"github.com/labstack/echo/v4"
)

// HTTPGateway story rest api controller
type HTTPGateway struct {
	ShopStoryService categorize.Service
}

// NewHTTPGateway new story controller instace
func NewHTTPGateway(e *echo.Group, svc0 categorize.Service) {
	handle := &HTTPGateway{svc0}

	e.POST("/shop/story", handle.CreateShopStoryController)
}

// CreateShopStoryController CreateShopStoryController
func (con HTTPGateway) CreateShopStoryController(e echo.Context) error {
	shopID := e.QueryParam("shop_id")
	storyIDs := []string{"1", "2"}
	response := con.ShopStoryService.CreateShopStoryService(shopID, storyIDs)
	return e.String(http.StatusOK, response)
}
