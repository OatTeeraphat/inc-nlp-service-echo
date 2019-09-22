package commons

import (
	"github.com/labstack/echo/v4"
)

// FillChatHTTPErrorHandler FillChatHTTPErrorHandler
func FillChatHTTPErrorHandler(err error, c echo.Context) {
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
