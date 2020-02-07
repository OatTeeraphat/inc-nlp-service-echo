package producer

import (
	"inc-nlp-service-echo/common_module/commons"
	"inc-nlp-service-echo/kafka_module/config"

	"github.com/Shopify/sarama"

	"github.com/labstack/gommon/log"
)

// Producer Producer
type Producer struct {
	Topic    string
	Producer sarama.SyncProducer
}

// NewKafkaProducer NewKafkaProducer
func NewKafkaProducer(selectENV *commons.SelectENV, topic string) *Producer {
	kafkaConf := config.NewKafkaProducerConfig(selectENV)
	kafkaBroker := config.NewKafkaBroker(selectENV)

	syncProducer, err := sarama.NewSyncProducer(kafkaBroker, kafkaConf)

	if err != nil {
		log.Error("failed to create producer: ", err)
	}

	return &Producer{
		Producer: syncProducer,
		Topic:    selectENV.KafkaTopicPrefix + topic,
	}
}

// Close close producer connection
func (con Producer) Close() {
	con.Producer.Close()
}
