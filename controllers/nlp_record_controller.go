package controllers

import (
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/services"
	"net/http"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/labstack/echo/v4"
)

// NlpController nlp rest api controller
type NlpController struct {
	NlpService services.INlpRecordService
}

// INlpController nlp rest api interface
type INlpController interface {
	ReadNlpReplyModelByShopController(e echo.Context) error
	CreateNlpRecordByShopController(e echo.Context) error
	ReadNlpRecordByShopController(e echo.Context) error
	UploadXlsxNlpRecordByShopController(e echo.Context) error
	DropNlpRecordByShopController(e echo.Context) error
}

// NewNlpController new nlp controller instace
func NewNlpController(nlpRecordService services.INlpRecordService) INlpController {
	return &NlpController{nlpRecordService}
}

// ReadNlpReplyModelByShopController example
// @Summary Read user from the store
// @Tags admin
// @Accept  json
// @Produce  json
// @Param id path int true "User Id"
// @Success 200 {object} User
// @Router /{keyword} [get]
func (con *NlpController) ReadNlpReplyModelByShopController(e echo.Context) error {
	keyword := e.QueryParam("keyword")
	shopID := e.QueryParam("shop_id")
	response := con.NlpService.ReadNlpReplyModel(keyword, shopID)
	return e.JSON(http.StatusOK, response)
}

// CreateNlpRecordByShopController create new nlp record by shop
// @Summary Read user from the store
// @Tags admin
// @Accept  json
// @Produce  json
// @Param id path int true "User Id"
// @Success 200 {object} User
// @Router /{keyword} [get]
func (con *NlpController) CreateNlpRecordByShopController(e echo.Context) error {
	shopID := e.QueryParam("shop_id")

	createNlpRecordModel := new([]models.CreateNlpRecordModel)
	e.Bind(&createNlpRecordModel)

	response := con.NlpService.CreateNlpRecord(*createNlpRecordModel, shopID)
	return e.String(http.StatusOK, response)
}

// ReadNlpRecordByShopController get nlp records by shop
// @Summary Read user from the store
// @Tags admin
// @Accept  json
// @Produce  json
// @Param id path int true "User Id"
// @Success 200 {object} User
// @Router / [get]
func (con *NlpController) ReadNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")
	// keyword := e.QueryParam("keyword")
	// response := con.NlpService.ReadNlpReplyModel(keyword, shopID)
	return e.JSON(http.StatusOK, "response")
}

// UploadXlsxNlpRecordByShopController create new nlp records by shop
// @Summary Read user from the store
// @Tags admin
// @Accept  json
// @Produce  json
// @Param id path int true "User Id"
// @Success 200 {object} User
// @Router /{keyword} [post]
func (con *NlpController) UploadXlsxNlpRecordByShopController(e echo.Context) error {
	shopID := e.QueryParam("shop_id")
	// sheetName := e.QueryParam("sheet_name")
	file, _, _ := e.Request().FormFile("xlsx")
	result, _ := excelize.OpenReader(file)
	sheetMap := result.GetSheetMap()
	sheetName := sheetMap[1]
	xlsxSheet := result.GetRows(sheetName)

	e.Logger().Debug(sheetMap)
	response := con.NlpService.UploadXlsxNlpRecord(shopID, xlsxSheet)

	return e.String(http.StatusOK, response)
}

// DropNlpRecordByShopController delete nlp record by shop
// @Summary Read user from the store
// @Tags admin
// @Accept  json
// @Produce  json
// @Param id path int true "User Id"
// @Success 200 {object} User
// @Router /{keyword} [delete]
func (con *NlpController) DropNlpRecordByShopController(e echo.Context) error {
	shopID := e.QueryParam("shop_id")
	response := con.NlpService.DropNlpReplyByShop(shopID)
	return e.String(http.StatusOK, response)
}
