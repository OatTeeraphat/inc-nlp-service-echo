package controllers

import (
	"inc-nlp-service-echo/services"
	"net/http"

	"github.com/labstack/echo/v4"
)

// ShopController shop rest api controller
type ShopController struct {
	ShopService services.IShopService
}

// IShopController shop rest api interface
type IShopController interface {
	ReadShopByIDController(e echo.Context) error
}

// NewShopController new shop controller instace
func NewShopController(svc0 services.IShopService) IShopController {
	return &ShopController{svc0}
}

// ReadShopByIDController ReadShopByIDController
func (con ShopController) ReadShopByIDController(e echo.Context) error {
	shopID := e.QueryParam("id")
	response := con.ShopService.ReadShopByIDService(shopID)
	return e.JSON(http.StatusOK, response)
}
