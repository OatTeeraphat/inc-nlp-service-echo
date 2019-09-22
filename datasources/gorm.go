package datasources

import (
	"inc-nlp-service-echo/domains"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// SyncGORM SyncORM
func SyncGORM() *gorm.DB {
	db, err := gorm.Open("postgres", "host=localhost port=54320 user=postgres dbname=fillchat sslmode=disable")

	if err != nil {
		println("postgres error connected", err.Error())
	}

	// Migrate the schema
	db.AutoMigrate(&domains.NlpRecordDomain{})

	// defer db.Close()

	return db
}

// const myDomain [][]interface

// FakeSyncGORM SyncORM
func FakeSyncGORM() *gorm.DB {
	db, err := gorm.Open("sqlite3", "fake_sqlite3.db")

	if err != nil {
		println("postgres error connected", err.Error())
	}

	// Migrate the schema
	db.AutoMigrate(&domains.NlpRecordDomain{})

	// defer db.Close()

	return db
}
