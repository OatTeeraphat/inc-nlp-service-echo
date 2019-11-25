package controller

import (
	"inc-nlp-service-echo/core_module/shop"
	"net/http"

	"github.com/labstack/echo/v4"
)

// ShopController shop rest api controller
type ShopController struct {
	ShopService shop.IShopService
}

// NewShopController new shop controller instace
func NewShopController(svc0 shop.IShopService) shop.IShopController {
	return &ShopController{svc0}
}

// ReadShopByIDController ReadShopByIDController
func (con ShopController) ReadShopByIDController(e echo.Context) error {
	shopID := e.QueryParam("id")
	response := con.ShopService.ReadShopByIDService(shopID)
	return e.JSON(http.StatusOK, response)
}
