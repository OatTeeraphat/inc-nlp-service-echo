package story

import "github.com/labstack/echo/v4"

// IStoryController story rest api interface
type IStoryController interface {
	ReadAllStoryRecordController(e echo.Context) error
	NewStoryRecordController(e echo.Context) error
	DeleteStoryByIDController(e echo.Context) error
}
