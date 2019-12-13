package gateway

import (
	"inc-nlp-service-echo/event_module/eventbus"
	"net/http"

	"github.com/labstack/gommon/log"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

// WebsocketGetway WebsocketGetway
type WebsocketGetway struct {
	Upgrader *websocket.Upgrader
	EventBus eventbus.IEventBus
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
func NewWebSocketGateway(e *echo.Group, event eventbus.IEventBus) {
	handle := &WebsocketGetway{
		Upgrader: newWebsocketConfig(),
		EventBus: event,
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

	go ws.EventBus.NlpLoggingSubscriber(conn)

	return nil
}
