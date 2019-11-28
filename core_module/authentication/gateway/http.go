package gateway

import (
	"inc-nlp-service-echo/auth_module/security"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

// HTTPGateway ClientAuthController
type HTTPGateway struct {
	ClientAuthSecurity security.IClientAuthSecurity
}

// NewHTTPGateway NewClientAuthController
func NewHTTPGateway(e *echo.Group, newClientAuthSecurity security.IClientAuthSecurity) {
	handle := &HTTPGateway{
		ClientAuthSecurity: newClientAuthSecurity,
	}

	e.POST("/login", handle.ClientLoginController)
}

// ClientLoginController ClientLoginController
func (h HTTPGateway) ClientLoginController(e echo.Context) error {
	username := e.FormValue("username")
	password := e.FormValue("password")

	// TODO: check to read data
	if username != "admin@incommonstudio.com" || password != "inc12490!" {
		return echo.ErrUnauthorized
	}

	expired := time.Now().Add(time.Hour * 72).Unix()

	t, err := h.ClientAuthSecurity.GenerateClientToken(expired)

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
