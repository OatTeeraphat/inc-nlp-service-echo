package gateway

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

// WebsocketGetway WebsocketGetway
type WebsocketGetway struct {
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

	// if err != nil {
	// 	log.Error(err)
	// 	return err
	// }

	// consumer0 := consumer.NewKafkaConsumer(uuid.NewV4().String())

	// topic := os.Getenv("CLOUDKARAFKA_TOPIC_PREFIX") + "nlp.dashboard.logging"

	// topicErr := consumer0.Consumer.Subscribe(topic, nil)

	// if topicErr != nil {
	// 	panic(topicErr)
	// }

	defer conn.Close()
	// defer consumer0.Close()

	fmt.Println("#### start nlp dashboard consume ####")

	// for {
	// 	msg, err := consumer0.Consumer.ReadMessage(-1)

	// 	if err == nil {
	// 		fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))

	// 		writeError := conn.WriteMessage(websocket.TextMessage, []byte(string(msg.Value)))

	// 		if writeError != nil {
	// 			log.Error(writeError)
	// 			return writeError
	// 		}

	// 	} else {
	// 		// The client will automatically try to recover from all errors.
	// 		fmt.Printf("Consumer error: %v (%v)\n", err, msg)
	// 	}
	// }
	return err
}