package controller

import (
	"inc-nlp-service-echo/core_module/categorize"
	"net/http"

	"github.com/labstack/echo/v4"
)

// ShopStoryController story rest api controller
type ShopStoryController struct {
	ShopStoryService categorize.IShopStoryService
}

// NewShopStoryController new story controller instace
func NewShopStoryController(svc0 categorize.IShopStoryService) categorize.IShopStoryController {
	return &ShopStoryController{svc0}
}

// CreateShopStoryController CreateShopStoryController
func (con ShopStoryController) CreateShopStoryController(e echo.Context) error {
	shopID := e.QueryParam("shop_id")
	storyIDs := []string{"1", "2"}
	response := con.ShopStoryService.CreateShopStoryService(shopID, storyIDs)
	return e.String(http.StatusOK, response)
}
