package consumer

import (
	"inc-nlp-service-echo/common_module/commons"
	"inc-nlp-service-echo/kafka_module/config"
	"log"

	cluster "github.com/bsm/sarama-cluster"
)

// Consumer Consumer
type Consumer struct {
	Cluster *cluster.Consumer
}

// NewKafkaConsumer NewKafkaConsumer
func NewKafkaConsumer(selectENV *commons.SelectENV, topic string, consumerGroup string) *Consumer {

	topics := []string{selectENV.KafkaTopicPrefix + topic}

	kafkaConf := config.NewKafkaConsumerConfig(selectENV)
	kafkaBroker := config.NewKafkaBroker(selectENV)

	consumer, err := cluster.NewConsumer(kafkaBroker, consumerGroup, topics, kafkaConf)
	if err != nil {
		panic(err)
	}

	// consume errors
	go func() {
		for err := range consumer.Errors() {
			log.Printf("Error: %s\n", err.Error())
		}
	}()

	// consume notifications
	go func() {
		for ntf := range consumer.Notifications() {
			log.Printf("Rebalanced: %+v\n", ntf)
		}
	}()

	return &Consumer{
		Cluster: consumer,
	}
}

// Close Close
func (con *Consumer) Close() {
	con.Cluster.Close()
}
