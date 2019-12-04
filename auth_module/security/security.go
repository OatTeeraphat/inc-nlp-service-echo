package security

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4/middleware"
)

type jwtCustomClaims struct {
	Name  string `json:"name"`
	Admin bool   `json:"admin"`
	jwt.StandardClaims
}

// NewJWTConfig NewJWTConfig
func NewJWTConfig(privateKey string) middleware.JWTConfig {
	return middleware.JWTConfig{
		Claims:     newJWTCustomClaims(),
		SigningKey: []byte(privateKey),
	}
}

func newJWTCustomClaims() *jwtCustomClaims {
	return &jwtCustomClaims{}
}

// ----------------------------------------------------------------------------------------------------------------------------------

// ClientAuthSecurity ClientAuthSecurity
type ClientAuthSecurity struct {
	*jwt.Token
	PrivateKey string
}

// IClientAuthSecurity IClientAuthSecurity
type IClientAuthSecurity interface {
	GenerateClientToken(expired int64) (string, error)
}

// NewClientAuthSecurity NewClientAuthSecurity
func NewClientAuthSecurity(privateKey string) IClientAuthSecurity {
	return &ClientAuthSecurity{
		PrivateKey: privateKey,
	}
}

// GenerateClientToken GenerateClientToken
func (secure ClientAuthSecurity) GenerateClientToken(expired int64) (string, error) {
	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = "Jon Snow"
	claims["admin"] = true
	claims["exp"] = expired

	// Generate encoded token and send it as response.
	return token.SignedString([]byte(secure.PrivateKey))
}
