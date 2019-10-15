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
// @Summary Read nlp model by shop id
// @Tags customer
// @Accept  json
// @Produce  json
// @Param shop_id query string true "shop identify"
// @Param keyword query string true "incomming keyword"
// @Success 200 {object} models.NlpReplyModel
// @Router /v1/nlp/record/reply [get]
func (con *NlpController) ReadNlpReplyModelByShopController(e echo.Context) error {
	keyword := e.QueryParam("keyword")
	shopID := e.QueryParam("shop_id")
	response := con.NlpService.ReadNlpReplyModel(keyword, shopID)
	return e.JSON(http.StatusOK, response)
}

// CreateNlpRecordByShopController create new nlp record by shop
// @Summary Create nlp model by shop id
// @Tags customer
// @Accept  json
// @Produce  json
// @Param shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [get]
func (con *NlpController) CreateNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")

	createNlpRecordModel := new([]models.CreateNlpRecordModel)
	e.Bind(&createNlpRecordModel)

	response := con.NlpService.CreateNlpRecord(*createNlpRecordModel)
	return e.String(http.StatusOK, response)
}

// ReadNlpRecordByShopController get nlp records by shop
// @Summary Read nlp record by shop id
// @Tags customer
// @Accept  json
// @Produce  text/html
// @Param shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [get]
func (con *NlpController) ReadNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")
	// keyword := e.QueryParam("keyword")
	// response := con.NlpService.ReadNlpReplyModel(keyword, shopID)
	return e.String(http.StatusOK, "OK")
}

// UploadXlsxNlpRecordByShopController create new nlp records by shop
// @Summary Upload nlp record with xlsx
// @Tags 	customer
// @Accept  multipart/form-data
// @Produce text/html
// @Param   xlsx formData file true  "this is a test file"
// @Param 	shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record/upload.xlsx [post]
func (con *NlpController) UploadXlsxNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")
	// sheetName := e.QueryParam("sheet_name")
	file, _, _ := e.Request().FormFile("xlsx")
	result, _ := excelize.OpenReader(file)
	sheetMap := result.GetSheetMap()
	sheetName := sheetMap[1]
	xlsxSheet := result.GetRows(sheetName)
	e.Logger().Debug(sheetMap)
	response := con.NlpService.UploadXlsxNlpRecord(xlsxSheet)

	return e.String(http.StatusOK, response)
}

// DropNlpRecordByShopController delete nlp record by shop
// @Summary Drop nlp record by shop id
// @Tags 	customer
// @Accept  text/html
// @Produce text/html
// @Param 	shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [delete]
func (con *NlpController) DropNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")
	response := con.NlpService.DropNlpReplyByShop()
	return e.String(http.StatusOK, response)
}
