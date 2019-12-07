package commons

import (
	"log"
	"os"
	"strconv"
)

// SelectENV SelectENV
type SelectENV struct {
	Env              string
	EchoAppName      string
	EchoPort         string
	EchoLogLevel     string
	NlpDBDialects    string
	NlpDBName        string
	NlpDBHost        string
	NlpDBPort        string
	NlpDBUsername    string
	NlpDBPassword    string
	KafkaBrokers     string
	KafkaUsername    string
	KafkaPassword    string
	KafkaTopicPrefix string
	KafkaGroupID     string
	IsSwagger        string
	IsGORMLogging    bool
}

// NewSelectENV switch
func NewSelectENV() *SelectENV {
	var env = os.Getenv("ENV")

	if env != "development" && env != "" {
		return SelectBuild()
	}
	return SelectDevelopment()
}

// SelectDevelopment DEVELOPMENT
func SelectDevelopment() *SelectENV {
	return &SelectENV{
		Env:              "development",
		EchoAppName:      "EchoApp-DEV",
		EchoPort:         "9000",
		EchoLogLevel:     "DEBUG",
		NlpDBDialects:    "postgres",
		NlpDBName:        "reaxllzt",
		NlpDBHost:        "john.db.elephantsql.com",
		NlpDBPort:        "5432",
		NlpDBUsername:    "reaxllzt",
		NlpDBPassword:    "qs0jZQMUWFOvQU4SaYXElVegjzDgLz7c",
		KafkaBrokers:     "moped-01.srvs.cloudkafka.com:9094,moped-02.srvs.cloudkafka.com:9094,moped-03.srvs.cloudkafka.com:9094",
		KafkaUsername:    "60vh9kjz",
		KafkaPassword:    "iMkMvCgioCShnTCAdsrDBLe0IdsM6RDF",
		KafkaTopicPrefix: "60vh9kjz-",
		KafkaGroupID:     "CLOUDKARAFKA_GROUPID",
		IsSwagger:        "true",
		IsGORMLogging:    formatENVtoBoolean("true"),
	}
}

// SelectBuild DOCKER ENVIRONMENT
func SelectBuild() *SelectENV {
	return &SelectENV{
		Env:              os.Getenv("ENV"),
		EchoAppName:      os.Getenv("ECHO_APP_NAME"),
		EchoPort:         os.Getenv("PORT"),
		EchoLogLevel:     os.Getenv("ECHO_LOG_LEVEL"),
		NlpDBDialects:    os.Getenv("NLP_DB_DIALECTS"),
		NlpDBName:        os.Getenv("NLP_DB_NAME"),
		NlpDBHost:        os.Getenv("NLP_DB_HOST"),
		NlpDBPort:        os.Getenv("NLP_DB_PORT"),
		NlpDBUsername:    os.Getenv("NLP_DB_USERNAME"),
		NlpDBPassword:    os.Getenv("NLP_DB_PASSWORD"),
		KafkaBrokers:     os.Getenv("KAFKA_BROKERS"),
		KafkaUsername:    os.Getenv("KAFKA_USERNAME"),
		KafkaPassword:    os.Getenv("KAFKA_PASSWORD"),
		KafkaTopicPrefix: os.Getenv("KAFKA_TOPIC_PREFIX"),
		KafkaGroupID:     os.Getenv("KAFKA_GROUP_ID"),
		IsSwagger:        os.Getenv("IS_SWAGGER"),
		IsGORMLogging:    formatENVtoBoolean(os.Getenv("IS_GORM_LOGGING")),
	}
}

// FormatENVtoBoolean format env to boolean
func formatENVtoBoolean(env string) bool {
	result, err := strconv.ParseBool(env)
	if err != nil {
		log.Fatal("swagger flag error: ", err)
	}
	return result
}

// FormatENVtoInteger format string to int
func formatENVtoInteger(env string) int {
	result, err := strconv.Atoi(env)
	if err != nil {
		log.Fatal("echo port error: ", err)
	}
	return result
}
