package commons

import (
	"log"
	"os"
	"strconv"
)

// FillChat12Factor FillChat12Factor
type FillChat12Factor struct {
	Env           string
	EchoAppName   string
	EchoPort      string
	EchoLogLevel  string
	NlpDBDialects string
	NlpDBName     string
	NlpDBHost     string
	NlpDBPort     string
	NlpDBUsername string
	NlpDBPassword string
	IsSwagger     string
}

// NewFillChat12Factor switch
func NewFillChat12Factor() *FillChat12Factor {
	var env = os.Getenv("ENV")

	if env != "development" && env != "" {
		return SelectFillChat12FactorBuild()
	}
	return SelectFillChat12FactorDevelopment()
}

// SelectFillChat12FactorDevelopment DEVELOPMENT
func SelectFillChat12FactorDevelopment() *FillChat12Factor {
	return &FillChat12Factor{
		Env:           "development",
		EchoAppName:   "EchoApp-DEV",
		EchoPort:      "9000",
		EchoLogLevel:  "DEBUG",
		NlpDBDialects: "postgres",
		NlpDBName:     "fillchat",
		NlpDBHost:     "localhost",
		NlpDBPort:     "54320",
		NlpDBUsername: "postgres",
		NlpDBPassword: "",
		IsSwagger:     "true",
	}
}

// SelectFillChat12FactorBuild DOCKER ENVIRONMENT
func SelectFillChat12FactorBuild() *FillChat12Factor {
	return &FillChat12Factor{
		Env:           os.Getenv("ENV"),
		EchoAppName:   os.Getenv("ECHO_APP_NAME"),
		EchoPort:      os.Getenv("PORT"),
		EchoLogLevel:  os.Getenv("ECHO_LOG_LEVEL"),
		NlpDBDialects: os.Getenv("NLP_DB_DIALECTS"),
		NlpDBName:     os.Getenv("NLP_DB_NAME"),
		NlpDBHost:     os.Getenv("NLP_DB_HOST"),
		NlpDBPort:     os.Getenv("NLP_DB_PORT"),
		NlpDBUsername: os.Getenv("NLP_DB_USERNAME"),
		NlpDBPassword: os.Getenv("NLP_DB_PASSWORD"),
		IsSwagger:     os.Getenv("IS_SWAGGER"),
	}
}

// FormatENVtoBoolean format env to boolean
func FormatENVtoBoolean(env string) bool {
	result, err := strconv.ParseBool(env)
	if err != nil {
		log.Fatal("swagger flag error: ", err)
	}
	return result
}

// FormatENVtoInteger format string to int
func FormatENVtoInteger(env string) int {
	result, err := strconv.Atoi(env)
	if err != nil {
		log.Fatal("echo port error: ", err)
	}
	return result
}
