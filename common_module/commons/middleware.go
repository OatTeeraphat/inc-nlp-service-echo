package commons

import (
	"github.com/labstack/echo/v4"
)

// FillChatMiddleware FillChatMiddleware
type FillChatMiddleware struct {
}

// IFillChatMiddleware IFillChatMiddleware
type IFillChatMiddleware interface {
	HTTPErrorMiddleware(err error, c echo.Context)
	StaffAuthMiddleware(username, password string, c echo.Context) (bool, error)
	CustomerAuthMiddleware(err error, c echo.Context)
}

// NewFillChatMiddleware NewFillChatMiddleware
func NewFillChatMiddleware() IFillChatMiddleware {
	return &FillChatMiddleware{}
}

// HTTPErrorMiddleware FillChatHTTPErrorHandler
func (*FillChatMiddleware) HTTPErrorMiddleware(err error, c echo.Context) {
	// fmt.Println(c.Path(), c.QueryParams(), err.Error())
	// code := http.StatusInternalServerError
	// if he, ok := err.(*echo.HTTPError); ok {
	// 	code = he.Code
	// }
	// errorPage := fmt.Sprintf("%d.html", code)
	// if err := c.File(errorPage); err != nil {
	// 	c.Logger().Error(err)
	// }
	// c.Logger().Error(err)
}

// StaffAuthMiddleware StaffAuthMiddleware
func (*FillChatMiddleware) StaffAuthMiddleware(username, password string, c echo.Context) (bool, error) {
	if username == "admin" && password == "admin" {
		return true, nil
	}
	return false, nil
}

// CustomerAuthMiddleware CustomerAuthMiddleware
func (*FillChatMiddleware) CustomerAuthMiddleware(err error, c echo.Context) {

	c.Logger().Info("hello")
}
