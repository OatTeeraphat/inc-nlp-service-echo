package datasources

import (
	"fmt"
	"inc-nlp-service-echo/commons"
	"inc-nlp-service-echo/domains"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// SyncGORM SyncORM
func SyncGORM(config *commons.FillChat12Factor) *gorm.DB {
	dbURI := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
		config.NlpDBHost,
		config.NlpDBPort,
		config.NlpDBUsername,
		config.NlpDBName,
		config.NlpDBPassword,
	)
	db, err := gorm.Open("postgres", dbURI)
	if err != nil {
		println("postgres error connected", err.Error())
	}
	// Migrate the schema
	db.AutoMigrate(&domains.NlpRecordDomain{})
	return db
}

// FakeSyncGORM SyncORM
func FakeSyncGORM() *gorm.DB {
	db, err := gorm.Open("sqlite3", "fake_sqlite3.db")
	if err != nil {
		println("postgres error connected: ", err.Error())
	}
	// Migrate the schema
	db.AutoMigrate(&domains.NlpRecordDomain{})
	return db
}
