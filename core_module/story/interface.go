package story

import (
	"inc-nlp-service-echo/core_module/story/dao"

	"github.com/labstack/echo/v4"
)

// HTTPGateway story rest api interface
type HTTPGateway interface {
	ReadAll(e echo.Context) error
	CreateOneStory(e echo.Context) error
	DeleteByID(e echo.Context) error
	UpdateOneByID(e echo.Context) error
}

// Service story service
type Service interface {
	ReadAll() []dao.ReadStoryDao
	CreateOneStory(newStoryModel dao.NewStoryDao) string
	DeleteByID(storyID string) string
	UpdateOneByID(storyID string) string
}
