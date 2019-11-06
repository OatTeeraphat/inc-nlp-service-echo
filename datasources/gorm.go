package datasources

import (
	"fmt"
	"inc-nlp-service-echo/commons"
	"inc-nlp-service-echo/domains"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// SyncGORM SyncORM
func SyncGORM(config *commons.FillChatSelectENV) *gorm.DB {
	dbURI := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
		config.NlpDBHost,
		config.NlpDBPort,
		config.NlpDBUsername,
		config.NlpDBName,
		config.NlpDBPassword,
	)
	db, err := gorm.Open(config.NlpDBDialects, dbURI)
	if err != nil {
		log.Fatalln("database error connected", err.Error())
	}
	// Migrate the schema
	db.AutoMigrate(
		&domains.NlpRecordDomain{},
		&domains.NlpTrainingLogDomain{},
		&domains.ShopStoryDomain{},
		&domains.StoryDomain{},
		&domains.ShopDomain{},
	)
	return db
}

// FakeSyncGORM SyncORM
func FakeSyncGORM() *gorm.DB {
	db, err := gorm.Open("sqlite3", "../fake_sqlite3.db")
	if err != nil {
		log.Fatalln("database error connected: ", err.Error())
	}
	// Migrate the schema
	db.AutoMigrate(
		&domains.NlpRecordDomain{},
		&domains.NlpTrainingLogDomain{},
		&domains.ShopStoryDomain{},
		&domains.StoryDomain{},
		&domains.ShopDomain{},
	)
	return db
}
