package nlp

import "github.com/labstack/echo/v4"

// INlpController nlp rest api interface
type INlpController interface {
	ReadNlpReplyModelByShopController(e echo.Context) error
	ReadPaginationNlpRecordController(e echo.Context) error
	CreateNlpRecordByShopController(e echo.Context) error
	UploadXlsxNlpRecordByShopController(e echo.Context) error
	DropNlpRecordByShopController(e echo.Context) error
	DeleteNlpRecordByIDController(e echo.Context) error
	BulkDeleteNlpRecordByIDsController(e echo.Context) error
	UpdateNlpRecordByIDController(e echo.Context) error
}

// INlpTrainingLogController nlp rest api interface
type INlpTrainingLogController interface {
	// ReadNlpReplyModelByShopController(e echo.Context) error
	ReadPaginationNlpTrainingLogController(e echo.Context) error
	// DropNlpRecordByShopController(e echo.Context) error
}
