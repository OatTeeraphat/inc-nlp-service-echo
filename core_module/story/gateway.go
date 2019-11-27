package story

import "github.com/labstack/echo/v4"

// StoryHTTPGateway story rest api interface
type HTTPGateway interface {
	ReadAllStoryRecordController(e echo.Context) error
	NewStoryRecordController(e echo.Context) error
	DeleteStoryByIDController(e echo.Context) error
}
