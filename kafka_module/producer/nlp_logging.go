package producer

import (
	"encoding/json"
	"fmt"
	"inc-nlp-service-echo/core_module/nlprecord/dao"

	"github.com/Shopify/sarama"
	"github.com/labstack/gommon/log"
)

// ProduceNlpDashboardMessage ProduceNlpDashboardMessage
func (con Producer) ProduceNlpDashboardMessage(value dao.ReadNlpReplyDao) {

	byteValue, jsonErr := json.Marshal(value)

	if jsonErr != nil {
		log.Error("failed to convert dao.ReadNlpReplyDao to ", con.Topic, jsonErr)
	}

	partition, offset, err := con.Producer.SendMessage(&sarama.ProducerMessage{
		Topic: con.Topic,
		Value: sarama.StringEncoder(byteValue),
	})
	if err != nil {
		log.Error("failed to send message to ", con.Topic, err)
	}
	fmt.Println("wrote message at partition: ", partition, ", offset:", offset)
}
