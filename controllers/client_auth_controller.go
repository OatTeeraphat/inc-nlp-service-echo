package controllers

import (
	"inc-nlp-service-echo/security"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

// ClientAuthController ClientAuthController
type ClientAuthController struct {
	ClientAuthSecurity security.IClientAuthSecurity
}

// IClientAuthController IClientAuthController
type IClientAuthController interface {
	ClientLoginController(c echo.Context) error
}

// NewClientAuthController NewClientAuthController
func NewClientAuthController(newClientAuthSecurity security.IClientAuthSecurity) IClientAuthController {
	return &ClientAuthController{
		ClientAuthSecurity: newClientAuthSecurity,
	}
}

// ClientLoginController ClientLoginController
func (svc ClientAuthController) ClientLoginController(e echo.Context) error {
	username := e.FormValue("username")
	password := e.FormValue("password")

	// Throws unauthorized error
	if username != "kai.chr160@gmail.com" || password != "inc1!" {
		return echo.ErrUnauthorized
	}

	// Create token
	// token := jwt.New(jwt.SigningMethodHS256)

	// // Set claims
	// claims := token.Claims.(jwt.MapClaims)
	// claims["name"] = "Jon Snow"
	// claims["admin"] = true
	// claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// // Generate encoded token and send it as response.
	// t, err := token.SignedString([]byte("secret"))

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
