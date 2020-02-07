package gateway

import (
	"fmt"
	"net/http"

	"github.com/labstack/gommon/log"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

// WebsocketGetway WebsocketGetway
type WebsocketGetway struct {
	Upgrader *websocket.Upgrader
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

// NewWebSocketGateway NewWebSocketGateway
func NewWebSocketGateway(e *echo.Group) {
	handle := &WebsocketGetway{
		Upgrader: newWebsocketConfig(),
	}

	e.Any("/nlp/dashboard/logging", handle.GetLogging)
}

// GetLogging GetLogging
func (ws WebsocketGetway) GetLogging(e echo.Context) error {
	conn, err := ws.Upgrader.Upgrade(e.Response(), e.Request(), nil)

	if err != nil {
		log.Error(err)
		return err
	}
	fmt.Print(conn)
	// go ws.EventBus.NlpLoggingSubscriber(conn)

	return nil
}
