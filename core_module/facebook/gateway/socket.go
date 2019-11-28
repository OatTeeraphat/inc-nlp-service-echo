package gateway

import (
	"encoding/json"
	"inc-nlp-service-echo/core_module/nlprecord"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

// SocketGateway SocketGateway
type SocketGateway struct {
	NlpService        nlp.Service
	WebSocketUpgrader websocket.Upgrader
}

// NewSocketGateway NewSocketGateway
func NewSocketGateway(e *echo.Group, nlpRecordService nlp.Service, ws websocket.Upgrader) {
	handle := &SocketGateway{
		NlpService:        nlpRecordService,
		WebSocketUpgrader: ws,
	}
	e.Any("/fb/webhook/socket.io", handle.ReplyFBWebhookSocketIO)
}

// ReplyFBWebhookSocketIO ReplyFBWebhookSocketIO
func (h *SocketGateway) ReplyFBWebhookSocketIO(c echo.Context) error {
	ws, err := h.WebSocketUpgrader.Upgrade(c.Response(), c.Request(), nil)

	log.Debug("socket connected")

	if err != nil {
		return err
	}

	defer ws.Close()

	for {
		_, msg, err := ws.ReadMessage()

		stringMsg := string(msg)
		log.Debug(stringMsg)

		go func(msg []byte) {

			if err != nil {
				log.Error(err)
			}
			if string(msg) != "" {
				nlpResult := h.NlpService.ReadNlpReply(stringMsg, "1")

				log.Info(nlpResult)

				data, _ := json.Marshal(nlpResult)

				// Write
				err := ws.WriteMessage(websocket.TextMessage, []byte(data))
				if err != nil {
					log.Error(err)
				}
			}
		}(msg)
	}

}

func readLoop(c *websocket.Conn) {
	for {
		if _, _, err := c.NextReader(); err != nil {
			c.Close()
			break
		}
	}
}
