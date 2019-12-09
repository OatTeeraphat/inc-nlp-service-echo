package eventbus

import (
	"bytes"
	"encoding/gob"
	"fmt"

	"github.com/cskr/pubsub"
	"github.com/gorilla/websocket"
)

type EventBus struct {
	Pubsub *pubsub.PubSub
	Topic  string
}

// EventBus EventBus
type IEventBus interface {
	NlpLoggingSubscriber(conn *websocket.Conn)
	Publisher(msg string)
	CloseChannel()
	Shutdown()
}

func NewEventBus(capcity int, topic string) IEventBus {
	return &EventBus{
		Pubsub: pubsub.New(capcity),
		Topic:  topic,
	}
}

func (event *EventBus) Publisher(msg string) {
	event.Pubsub.Pub(msg, event.Topic)
}

func (event *EventBus) subscribe() chan interface{} {
	return event.Pubsub.Sub(event.Topic)
}

func (event *EventBus) Unsubscribe(channel chan interface{}) {
	fmt.Println("### unsubscribe ###")
	event.Pubsub.Unsub(channel, event.Topic)
}

func (event *EventBus) CloseChannel() {
	event.Pubsub.Close(event.Topic)
}

func (event *EventBus) Shutdown() {
	event.Pubsub.Shutdown()
}

func getBytes(key interface{}) ([]byte, error) {
	var buf bytes.Buffer
	enc := gob.NewEncoder(&buf)
	err := enc.Encode(key)
	if err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
