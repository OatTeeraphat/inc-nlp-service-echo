package eventbus

import (
	"fmt"

	"github.com/cskr/pubsub"
	"github.com/gorilla/websocket"
)

type EventBus struct {
	Pubsub  *pubsub.PubSub
	Topic   string
	Channel chan interface{}
}

// EventBus EventBus
type IEventBus interface {
	NlpLoggingSubscriber(conn *websocket.Conn)
	NlpLoggingPublisher(msg string)
	CloseChannel()
	Shutdown()
}

func NewEventBus(capcity int, topic string) IEventBus {
	return &EventBus{
		Pubsub: pubsub.New(capcity),
		Topic:  topic,
	}
}

func (event *EventBus) NlpLoggingPublisher(msg string) {
	event.Pubsub.Pub(msg, event.Topic)
}

func (event *EventBus) NlpLoggingSubscriber(conn *websocket.Conn) {
	i := 0
	ch := event.subscribe()

	defer func() {
		defer event.Unsubscribe(ch)
		defer conn.Close()
	}()

	for {

		if msg, ok := <-ch; ok {
			fmt.Printf("Received %s, %d times.\n", msg, i)

			errr := conn.WriteJSON(msg)

			if errr != nil {
				fmt.Println("WriteMessage Error")
				break
			}

			i++

		} else {
			fmt.Println("else #####")
			break
		}
	}

	fmt.Println("loop ending #####")
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
