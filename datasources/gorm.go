package datasources

import (
	"errors"
	"fmt"
	"inc-nlp-service-echo/commons"
	"inc-nlp-service-echo/domains"
	"log"
	"reflect"
	"sort"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// FillChatGORM FillChatGORM
type FillChatGORM struct {
	DB *gorm.DB
}

// NewFillChatGORM NewFillChatGORM
func NewFillChatGORM(config *commons.FillChatSelectENV) *FillChatGORM {
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
	return &FillChatGORM{
		DB: db,
	}
}

// BulkDeleteByIDs BulkDeleteByIDs
func (gorm FillChatGORM) BulkDeleteByIDs() error {

	return nil
}

// BulkInsert multiple records at once
// [objects]        Must be a slice of struct
// [chunkSize]      Number of records to insert at once.
//                  Embedding a large number of variables at once will raise an error beyond the limit of prepared statement.
//                  Larger size will normally lead the better performance, but 2000 to 3000 is reasonable.
// [excludeColumns] Columns you want to exclude from insert. You can omit if there is no column you want to exclude.
func (gorm FillChatGORM) BulkInsert(objects []interface{}, chunkSize int, excludeColumns ...string) error {
	// Split records with specified size not to exceed Database parameter limit
	for _, objSet := range splitObjects(objects, chunkSize) {
		if err := insertObjSet(gorm.DB, objSet, excludeColumns...); err != nil {
			return err
		}
	}
	return nil
}

func insertObjSet(db *gorm.DB, objects []interface{}, excludeColumns ...string) error {
	if len(objects) == 0 {
		return nil
	}

	firstAttrs, err := extractMapValue(objects[0], excludeColumns)
	if err != nil {
		return err
	}

	attrSize := len(firstAttrs)

	// Scope to eventually run SQL
	mainScope := db.NewScope(objects[0])
	// Store placeholders for embedding variables
	placeholders := make([]string, 0, attrSize)

	// Replace with database column name
	dbColumns := make([]string, 0, attrSize)
	for _, key := range sortedKeys(firstAttrs) {
		dbColumns = append(dbColumns, gorm.ToColumnName(key))
	}

	for _, obj := range objects {
		objAttrs, err := extractMapValue(obj, excludeColumns)
		if err != nil {
			return err
		}

		// If object sizes are different, SQL statement loses consistency
		if len(objAttrs) != attrSize {
			return errors.New("attribute sizes are inconsistent")
		}

		scope := db.NewScope(obj)

		// Append variables
		variables := make([]string, 0, attrSize)
		for _, key := range sortedKeys(objAttrs) {
			scope.AddToVars(objAttrs[key])
			variables = append(variables, "?")
		}

		valueQuery := "(" + strings.Join(variables, ", ") + ")"
		placeholders = append(placeholders, valueQuery)

		// Also append variables to mainScope
		mainScope.SQLVars = append(mainScope.SQLVars, scope.SQLVars...)
	}

	mainScope.Raw(fmt.Sprintf("INSERT INTO %s (%s) VALUES %s",
		mainScope.QuotedTableName(),
		strings.Join(dbColumns, ", "),
		strings.Join(placeholders, ", "),
	))

	return db.Exec(mainScope.SQL, mainScope.SQLVars...).Error
}

// Obtain columns and values required for insert from interface
func extractMapValue(value interface{}, excludeColumns []string) (map[string]interface{}, error) {
	if reflect.ValueOf(value).Kind() != reflect.Struct {
		return nil, errors.New("value must be kind of Struct")
	}

	var attrs = map[string]interface{}{}

	for _, field := range (&gorm.Scope{Value: value}).Fields() {
		// Exclude relational record because it's not directly contained in database columns
		_, hasForeignKey := field.TagSettingsGet("FOREIGNKEY")

		if !containString(excludeColumns, field.Struct.Name) && field.StructField.Relationship == nil && !hasForeignKey &&
			!field.IsIgnored && !(field.DBName == "id" && field.IsPrimaryKey) {
			if field.Struct.Name == "CreatedAt" || field.Struct.Name == "UpdatedAt" {
				attrs[field.DBName] = time.Now()
			} else if field.StructField.HasDefaultValue && field.IsBlank {
				// If default value presents and field is empty, assign a default value
				if val, ok := field.TagSettingsGet("DEFAULT"); ok {
					attrs[field.DBName] = val
				} else {
					attrs[field.DBName] = field.Field.Interface()
				}
			} else {
				attrs[field.DBName] = field.Field.Interface()
			}
		}
	}
	return attrs, nil
}

// Separate objects into several size
func splitObjects(objArr []interface{}, size int) [][]interface{} {
	var chunkSet [][]interface{}
	var chunk []interface{}

	for len(objArr) > size {
		chunk, objArr = objArr[:size], objArr[size:]
		chunkSet = append(chunkSet, chunk)
	}
	if len(objArr) > 0 {
		chunkSet = append(chunkSet, objArr[:])
	}

	return chunkSet
}

// Enable map keys to be retrieved in same order when iterating
func sortedKeys(val map[string]interface{}) []string {
	var keys []string
	for key := range val {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	return keys
}

// Check if string value is contained in slice
func containString(s []string, value string) bool {
	for _, v := range s {
		if v == value {
			return true
		}
	}
	return false
}
