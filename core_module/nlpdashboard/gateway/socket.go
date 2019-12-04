package gateway

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

// Websocket Websocket
type Websocket struct {
	Upgrader *websocket.Upgrader
	// Conn *websocket.Conn
}

func newWebsocketConfig() *websocket.Upgrader {
	return &websocket.Upgrader{
		ReadBufferSize:    1024,
		WriteBufferSize:   1024,
		EnableCompression: true,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
}

// NewWebSocket NewWebSocket
func NewWebSocket(e *echo.Group) {
	handle := &Websocket{
		Upgrader: newWebsocketConfig(),
	}

	e.Any("/nlp/dashboard/logging", handle.GetLogging)
}

// GetLogging GetLogging
func (ws Websocket) GetLogging(e echo.Context) error {
	conn, err := ws.Upgrader.Upgrade(e.Response(), e.Request(), nil)
	if err != nil {
		log.Error(err)
		return err
	}

	writeError := conn.WriteMessage(websocket.TextMessage, []byte("hello"))

	if writeError != nil {
		log.Error(writeError)
		return writeError
	}

	return nil
}
