package controller

import (
	"inc-nlp-service-echo/common_module/security"
	"inc-nlp-service-echo/core_module/authentication"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

// ClientAuthController ClientAuthController
type ClientAuthController struct {
	ClientAuthSecurity security.IClientAuthSecurity
}

// NewClientAuthController NewClientAuthController
func NewClientAuthController(newClientAuthSecurity security.IClientAuthSecurity) authentication.IClientAuthController {
	return &ClientAuthController{
		ClientAuthSecurity: newClientAuthSecurity,
	}
}

// ClientLoginController ClientLoginController
func (svc ClientAuthController) ClientLoginController(e echo.Context) error {
	username := e.FormValue("username")
	password := e.FormValue("password")

	// TODO: check to read data
	if username != "admin@incommonstudio.com" || password != "inc12490!" {
		return echo.ErrUnauthorized
	}

	expired := time.Now().Add(time.Hour * 72).Unix()

	t, err := svc.ClientAuthSecurity.GenerateClientToken(expired)

	if err != nil {
		return err
	}

	// TODO: .... save client access token

	return e.JSON(http.StatusOK, map[string]interface{}{
		"client_id":     "mock_Client_ID",
		"client_secret": "mock_Client_secret",
		"access_token":  t,
		"expired_date":  expired,
	})
	// return e.String(http.StatusOK, "OK")
}
