package consumer

import (
	"crypto/tls"
	"inc-nlp-service-echo/common_module/commons"
	"inc-nlp-service-echo/kafka_module/config"
	"log"
	"strings"

	"github.com/Shopify/sarama"
)

// Consumer Consumer
type Consumer struct {
	Config sarama.Consumer
	Topic  string
}

func createTLSConfiguration() (t *tls.Config) {
	t = &tls.Config{
		InsecureSkipVerify: false,
	}
	return t
}

// NewConsumerSarama NewConsumerSarama
func NewConsumerSarama(selectENV *commons.FillChatSelectENV) *Consumer {
	algorithm := "sha256"
	splitBrokers := strings.Split(selectENV.KafkaBrokers, ",")
	conf := sarama.NewConfig()
	conf.Producer.Retry.Max = 1
	conf.Producer.RequiredAcks = sarama.WaitForAll
	conf.Producer.Return.Successes = true
	conf.Metadata.Full = true
	conf.Version = sarama.V0_10_0_0
	conf.ClientID = "sasl_scram_client"
	conf.Metadata.Full = true
	conf.Net.SASL.Enable = true
	conf.Net.SASL.User = selectENV.KafkaUsername
	conf.Net.SASL.Password = selectENV.KafkaPassword
	conf.Net.SASL.Handshake = true
	if algorithm == "sha512" {
		conf.Net.SASL.SCRAMClientGeneratorFunc = func() sarama.SCRAMClient { return &config.XDGSCRAMClient{HashGeneratorFcn: config.SHA512} }
		conf.Net.SASL.Mechanism = sarama.SASLMechanism(sarama.SASLTypeSCRAMSHA512)
	} else if algorithm == "sha256" {
		conf.Net.SASL.SCRAMClientGeneratorFunc = func() sarama.SCRAMClient { return &config.XDGSCRAMClient{HashGeneratorFcn: config.SHA256} }
		conf.Net.SASL.Mechanism = sarama.SASLMechanism(sarama.SASLTypeSCRAMSHA256)

	} else {
		log.Fatalf("invalid SHA algorithm \"%s\": can be either \"sha256\" or \"sha512\"", algorithm)
	}

	conf.Net.TLS.Enable = true
	conf.Net.TLS.Config = createTLSConfiguration()
	consumer, err := sarama.NewConsumer(splitBrokers, conf)
	if err != nil {
		panic(err)
	}

	return &Consumer{
		Config: consumer,
		Topic:  selectENV.KafkaTopicPrefix + "ping.kafka",
	}
}

// Close Close
func (con *Consumer) Close() {
	con.Config.Close()
}
