package gateway

import (
	"github.com/labstack/echo/v4"
	"inc-nlp-service-echo/core_module/app"
	"net/http"
)

type HTTPGateway struct {
	AppService app.Service
}

func NewHTTPGateway(e *echo.Group) {
	handle := &HTTPGateway{}

	e.POST("/client/login", handle.LoginController)
	e.GET("/client/:id/app", handle.ReadAppByMemberIDController)
	e.GET("/client/:id/secret", handle.ReadSecretByMemberIDController)
}

func (h HTTPGateway) LoginController(e echo.Context) error {
	type Client struct {
		Consumer_id   string `json:"consumer_id" xml:"consumer_id"`
		Username      string `json:"username" xml:"username"`
		Email         string `json:"email" xml:"email"`
		Access_token  string `json:"access_token" xml:"access_token"`
		Refresh_token string `json:"refresh_token" xml:"refresh_token"`
		Client_secret string `json:"client_secret" xml:"client_secret"`
		Client_id     string `json:"client_id" xml:"client_id"`
		Expires_in    string `json:"expires_in" xml:"expires_in"`
	}

	c := &Client{
		Consumer_id:   "f9997fb2-9252-464d-be1f-0d3d565275fa",
		Username:      "kai31416",
		Email:         "kai.chr160@gmail.com",
		Access_token:  "jMyCK8iofLpNxgH7uhF6Xu7u55xCAMwv",
		Refresh_token: "TcmoLdMawqsDb3CBp5iLONTTy55H054G",
		Client_secret: "uwUWhlzpK8aKhxubUAi0hM3R99txYjIR",
		Client_id:     "fGIOELgB3lrtqd3oKn2q3A2wBVzMw9Tg",
		Expires_in:    "2020-03-06T00:35:51.000Z",
	}

	return e.JSON(http.StatusOK, c)
}

func (h HTTPGateway) ReadAppByMemberIDController(e echo.Context) error {
	// id := e.Param("id")
	type App struct {
		Id     string `json:"id" xml:"id"`
		Status int    `json:"status" xml:"status"`
		Name   string `json:"name" xml:"name"`
		Owner  string `json:"owner" xml:"owner"`
		Plan   string `json:"plan" xml:"plan"`
	}

	a := &App{
		Id:     "fGIOELgB3lrtqd3oKn2q3A2wBVzMw9Tg",
		Status: 1,
		Name:   "incommon",
		Owner:  "kai31416",
		Plan:   "unlimited",
	}

	return e.JSON(http.StatusOK, a)
}

func (h HTTPGateway) ReadSecretByMemberIDController(e echo.Context) error {
	// id := e.Param("id")
	type Secret struct {
		Client_secret string `json:"client_secret" xml:"client_secret"`
		Access_token  string `json:"access_token" xml:"access_token"`
	}

	s := &Secret{
		Client_secret: "fGIOELgB3lrtqd3oKn2q3A2wBVzMw9Tg",
		Access_token:  "jMyCK8iofLpNxgH7uhF6Xu7u55xCAMwv",
	}

	return e.JSON(http.StatusOK, s)
}
