package controller

import (
	"fmt"
	nlp "inc-nlp-service-echo/core_module/nlprecord"
	"inc-nlp-service-echo/core_module/nlprecord/dao"
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

	e.POST("/nlp/record", handle.CreateRecord)
	e.POST("/nlp/record/upload.xlsx", handle.UploadXlsx)
	e.DELETE("/nlp/record/drop", handle.DropAllRecord)
	e.DELETE("/nlp/record", handle.DeleteByID)
	e.DELETE("/nlp/record/bulk", handle.BulkDeleteByIDs)
	e.GET("/nlp/record/pagination", handle.SearchPagination)
	e.GET("/nlp/record/reply", handle.ReadNlpReply)
	e.PUT("/nlp/record", handle.UpdateByIDAndClientID)
}

// ReadNlpReply example
// @Summary Read nlp model by app id
// @Tags client
// @Accept  json
// @Produce  json
// @Param app_id query string true "app identify"
// @Param keyword query string true "incomming keyword"
// @Success 200 {object} models.NlpReplyModel
// @Router /v1/nlp/record/reply [get]
func (con *HTTPGateway) ReadNlpReply(e echo.Context) error {
	keyword := e.QueryParam("keyword")
	appID := e.QueryParam("app_id")
	response := con.NlpService.ReadNlpReply(keyword, appID)
	return e.JSON(http.StatusOK, response)
}

// CreateRecord create new nlp record by app
// @Summary Create nlp model by app id
// @Tags client
// @Accept  json
// @Produce  json
// @Param app_id query string true "app identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [get]
func (con *HTTPGateway) CreateRecord(e echo.Context) error {
	// appID := e.QueryParam("app_id")

	createNlpRecordModel := new([]dao.CreateNlpRecordDao)
	e.Bind(&createNlpRecordModel)

	response := con.NlpService.CreateRecord(*createNlpRecordModel)
	return e.String(http.StatusOK, response)
}

// SearchPagination get nlp records by app
// @Summary Read nlp record by app id
// @Tags client
// @Accept  json
// @Produce  text/html
// @Param app_id query string true "app identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [get]
func (con *HTTPGateway) SearchPagination(e echo.Context) error {
	intent := e.QueryParam("intent")
	keyword := e.QueryParam("keyword")
	story := e.QueryParam("story")
	page := e.QueryParam("page")
	response := con.NlpService.SearchPagination(keyword, intent, story, page)
	return e.JSON(http.StatusOK, response)
}

// UploadXlsx create new nlp records by app
// @Summary Upload nlp record with xlsx
// @Tags 	client
// @Accept  multipart/form-data
// @Produce text/html
// @Param   xlsx formData file true  "this is a test file"
// @Param 	app_id query string true "app identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record/upload.xlsx [post]
func (con *HTTPGateway) UploadXlsx(e echo.Context) error {
	// appID := e.QueryParam("app_id")
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
	response := con.NlpService.UploadXlsx(xlsxSheet)

	return e.String(http.StatusOK, response)
}

// DropAllRecord delete nlp record by app
// @Summary Drop nlp record by app id
// @Tags 	client
// @Accept  text/html
// @Produce text/html
// @Param 	app_id query string true "app identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [delete]
func (con *HTTPGateway) DropAllRecord(e echo.Context) error {
	// appID := e.QueryParam("app_id")
	response := con.NlpService.DropAllRecord()
	return e.String(http.StatusOK, response)
}

// DeleteByID delete nlp record by app
// @Summary Drop nlp record by app id
// @Tags 	client
// @Accept  text/html
// @Produce text/html
// @Param 	app_id query string true "app identify"
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record [delete]
func (con *HTTPGateway) DeleteByID(e echo.Context) error {
	id := e.QueryParam("id")
	response := con.NlpService.DeleteByID(id)
	return e.String(http.StatusOK, response)
}

// BulkDeleteByIDs delete nlp record by app
// @Summary batch delete nlp record by id
// @Tags 	client
// @Accept  text/html
// @Produce text/html
// @Success 200 {string} string "OK"
// @Router /v1/nlp/record/bulk [delete]
func (con *HTTPGateway) BulkDeleteByIDs(e echo.Context) error {
	ids := new([]uint)
	e.Bind(&ids)
	fmt.Print(*ids)
	response, error := con.NlpService.BulkDeleteByIDs(*ids)

	if error != nil {
		return e.String(http.StatusUnprocessableEntity, response)
	}

	return e.String(http.StatusOK, response)
}

// UpdateByIDAndClientID update nlp record by id and ClientID
func (con *HTTPGateway) UpdateByIDAndClientID(e echo.Context) error {
	domain := new(dao.UpdateNlpRecordDao)
	e.Bind(&domain)
	response := con.NlpService.UpdateByIDAndClientID(*domain)
	return e.String(http.StatusOK, response)
}
