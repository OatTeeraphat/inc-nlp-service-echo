package consumer

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/Shopify/sarama"
)

// Consuming Consuming
func (con Consumer) Consuming() {

	log.Println("commence consuming")
	partitionConsumer, err := con.Config.ConsumePartition(con.Topic, 0, sarama.OffsetNewest)
	if err != nil {
		panic(err)
	}

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
			case err := <-partitionConsumer.Errors():
				fmt.Println(err)
			case msg := <-partitionConsumer.Messages():
				msgCount++
				fmt.Println("Received messages", string(msg.Key), string(msg.Value))
			case <-signals:
				fmt.Println("Interrupt is detected")
				doneCh <- struct{}{}
				partitionConsumer.Close()
				break
			}
		}
	}()

	<-doneCh
	fmt.Println("Processed", msgCount, "messages")
}
