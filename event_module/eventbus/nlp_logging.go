package eventbus

import (
	"fmt"

	"github.com/gorilla/websocket"
)

func (event *EventBus) NlpLoggingSubscriber(conn *websocket.Conn) {
	i := 0
	ch := event.subscribe()

	defer conn.Close()
	defer event.Unsubscribe(ch)

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
}
