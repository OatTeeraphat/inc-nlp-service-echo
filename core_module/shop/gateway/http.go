package gateway

import (
	"inc-nlp-service-echo/core_module/shop"
	"net/http"

	"github.com/labstack/echo/v4"
)

// HTTPGateway shop rest api controller
type HTTPGateway struct {
	ShopService shop.Service
}

// NewHTTPGateway new shop controller instace
func NewHTTPGateway(svc0 shop.Service) shop.HTTPGateway {
	return &HTTPGateway{svc0}
}

// ReadShopByIDController ReadShopByIDController
func (h HTTPGateway) ReadShopByIDController(e echo.Context) error {
	shopID := e.QueryParam("id")
	response := h.ShopService.ReadShopByIDService(shopID)
	return e.JSON(http.StatusOK, response)
}
