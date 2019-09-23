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
	if os.Getenv("ENV") == "development" {
		return SelectFillChat12FactorDevelopment()
	}
	if os.Getenv("ENV") == "" {
		return SelectFillChat12FactorDevelopment()
	}
	return SelectFillChat12FactorBuild()
}

// SelectFillChat12FactorDevelopment !!!!!!!!! DEVELOPMENT !!!!!!
func SelectFillChat12FactorDevelopment() *FillChat12Factor {
	return &FillChat12Factor{
		Env:           "development",
		EchoPort:      "9000",
		EchoAppName:   "EchoApp-DEV",
		NlpDBDialects: "postgres",
		NlpDBName:     "fillchat",
		NlpDBHost:     "localhost",
		NlpDBPort:     "54320",
		NlpDBUsername: "postgres",
		NlpDBPassword: "",
		IsSwagger:     "true",
	}
}

// SelectFillChat12FactorBuild !!!!!!!!! DOCKER ENVIRONMENT !!!!!!
func SelectFillChat12FactorBuild() *FillChat12Factor {
	return &FillChat12Factor{
		Env:           os.Getenv("ENV"),
		EchoPort:      os.Getenv("ECHO_PORT"),
		EchoAppName:   os.Getenv("ECHO_APP_NAME"),
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
