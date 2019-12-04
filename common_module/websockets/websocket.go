package websockets

import (
	"net/http"

	"github.com/gorilla/websocket"
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
func NewWebSocket() *Websocket {
	return &Websocket{
		Upgrader: newWebsocketConfig(),
	}
}
