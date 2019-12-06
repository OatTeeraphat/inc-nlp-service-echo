package producer

import (
	"fmt"

	"github.com/Shopify/sarama"
	"github.com/labstack/gommon/log"
)

// ProduceNlpDashboardMessage ProduceNlpDashboardMessage
func (con Producer) ProduceNlpDashboardMessage(value string) {
	partition, offset, err := con.Producer.SendMessage(&sarama.ProducerMessage{
		Topic: con.Topic,
		Value: sarama.StringEncoder(value),
	})
	if err != nil {
		log.Error("failed to send message to ", con.Topic, err)
	}
	fmt.Println("wrote message at partition: ", partition, ", offset:", offset)
}
