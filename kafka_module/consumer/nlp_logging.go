package consumer

import (
	"fmt"
	"log"
	"os"
	"os/signal"
)

// ConsumeNlpLoggingMessage ConsumeNlpLoggingMessage
func (con Consumer) ConsumeNlpLoggingMessage() {

	log.Println("consumer created")
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt)

	// Count how many message processed
	msgCount := 0

	// Get signnal for finish
	doneCh := make(chan struct{})

	go func() {
		for {
			select {

			case err := <-con.Cluster.Errors():
				fmt.Println(err)

			case msg := <-con.Cluster.Messages():
				msgCount++
				fmt.Println("Received messages", string(msg.Key), string(msg.Value))

			case <-signals:
				fmt.Println("Interrupt is detected")
				doneCh <- struct{}{}
				con.Cluster.Close()
				break
			}
		}
	}()

	<-doneCh
	fmt.Println("Processed", msgCount, "messages")
}
