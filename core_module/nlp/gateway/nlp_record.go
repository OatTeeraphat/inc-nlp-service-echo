package controller

import (
	"fmt"
	"inc-nlp-service-echo/core_module/nlp"
	"inc-nlp-service-echo/core_module/nlp/dao"
	"net/http"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
)

// HTTPGateway nlp rest api controller
type HTTPGateway struct {
	NlpService nlp.Service
}

// NewHTTPGateway new nlp controller instace
func NewHTTPGateway(e *echo.Group, nlpRecordService nlp.Service) {
	handle := &HTTPGateway{nlpRecordService}

	e.POST("/nlp/record", handle.CreateNlpRecordByShopController)
	e.POST("/nlp/record/upload.xlsx", handle.UploadXlsxNlpRecordByShopController)
	e.DELETE("/nlp/record/drop", handle.DropNlpRecordByShopController)
	e.DELETE("/nlp/record", handle.DeleteNlpRecordByIDController)
	e.DELETE("/nlp/record/bulk", handle.BulkDeleteNlpRecordByIDsController)
	e.GET("/nlp/record/pagination", handle.ReadPaginationNlpRecordController)
	e.GET("/nlp/record/reply", handle.ReadNlpReplyModelByShopController)
	e.PUT("/nlp/record", handle.UpdateNlpRecordByIDController)
}

// ReadNlpReplyModelByShopController example
// @Summary Read nlp model by shop id
// @Tags client
// @Accept  json
// @Produce  json
// @Param shop_id query string true "shop identify"
// @Param keyword query string true "incomming keyword"
// @Success 200 {object} models.NlpReplyModel
// @Router /v1/nlp/record/reply [get]
func (con *HTTPGateway) ReadNlpReplyModelByShopController(e echo.Context) error {
	keyword := e.QueryParam("keyword")
	shopID := e.QueryParam("shop_id")
	response := con.NlpService.ReadNlpReplyModelService(keyword, shopID)
	return e.JSON(http.StatusOK, response)
}

// CreateNlpRecordByShopController create new nlp record by shop
// @Summary Create nlp model by shop id
// @Tags client
// @Accept  json
// @Produce  json
// @Param shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [get]
func (con *HTTPGateway) CreateNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")

	createNlpRecordModel := new([]dao.CreateNlpRecordModel)
	e.Bind(&createNlpRecordModel)

	response := con.NlpService.CreateNlpRecordService(*createNlpRecordModel)
	return e.String(http.StatusOK, response)
}

// ReadPaginationNlpRecordController get nlp records by shop
// @Summary Read nlp record by shop id
// @Tags client
// @Accept  json
// @Produce  text/html
// @Param shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [get]
func (con *HTTPGateway) ReadPaginationNlpRecordController(e echo.Context) error {
	intent := e.QueryParam("intent")
	keyword := e.QueryParam("keyword")
	story := e.QueryParam("story")
	page := e.QueryParam("page")
	response := con.NlpService.ReadPaginationNlpRecordService(keyword, intent, story, page)
	return e.JSON(http.StatusOK, response)
}

// UploadXlsxNlpRecordByShopController create new nlp records by shop
// @Summary Upload nlp record with xlsx
// @Tags 	client
// @Accept  multipart/form-data
// @Produce text/html
// @Param   xlsx formData file true  "this is a test file"
// @Param 	shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record/upload.xlsx [post]
func (con *HTTPGateway) UploadXlsxNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")
	// sheetName := e.QueryParam("sheet_name")

	log.Debug(e.Request())

	file, _, err := e.Request().FormFile("xlsx")

	log.Debug("########################## XLSX file DEBUG ##########################", file)

	if err != nil {
		log.Error(err)
		// return e.String(http.StatusBadRequest, "INVALID")
	}

	result, _ := excelize.OpenReader(file)
	sheetMap := result.GetSheetMap()
	sheetName := sheetMap[1]
	xlsxSheet := result.GetRows(sheetName)
	response := con.NlpService.UploadXlsxNlpRecordService(xlsxSheet)

	return e.String(http.StatusOK, response)
}

// DropNlpRecordByShopController delete nlp record by shop
// @Summary Drop nlp record by shop id
// @Tags 	client
// @Accept  text/html
// @Produce text/html
// @Param 	shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [delete]
func (con *HTTPGateway) DropNlpRecordByShopController(e echo.Context) error {
	// shopID := e.QueryParam("shop_id")
	response := con.NlpService.DropNlpReplyByShopService()
	return e.String(http.StatusOK, response)
}

// DeleteNlpRecordByIDController delete nlp record by shop
// @Summary Drop nlp record by shop id
// @Tags 	client
// @Accept  text/html
// @Produce text/html
// @Param 	shop_id query string true "shop identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [delete]
func (con *HTTPGateway) DeleteNlpRecordByIDController(e echo.Context) error {
	id := e.QueryParam("id")
	response := con.NlpService.RemoveNlpRecordByID(id)
	return e.String(http.StatusOK, response)
}

// BulkDeleteNlpRecordByIDsController delete nlp record by shop
// @Summary batch delete nlp record by id
// @Tags 	client
// @Accept  text/html
// @Produce text/html
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [delete]
func (con *HTTPGateway) BulkDeleteNlpRecordByIDsController(e echo.Context) error {
	ids := new([]uint)
	e.Bind(&ids)

	fmt.Print(*ids)

	response, error := con.NlpService.BulkDeleteNlpRecordByIDs(*ids)

	if error != nil {
		return e.String(http.StatusUnprocessableEntity, response)
	}

	return e.String(http.StatusOK, response)
}

// UpdateNlpRecordByIDAndClientID update nlp record by id and ClientID
func (con *HTTPGateway) UpdateNlpRecordByIDController(e echo.Context) error {
	id := e.QueryParam("id")
	response := con.NlpService.UpdateNlpRecordByIDAndClientID(id)
	return e.String(http.StatusOK, response)
}
