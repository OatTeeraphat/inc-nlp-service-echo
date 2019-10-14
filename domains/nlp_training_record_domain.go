package domains

import (
	"github.com/jinzhu/gorm"
)

// NlpTrainingRecordDomain NlpTrainingRecordDomain
type NlpTrainingRecordDomain struct {
	gorm.Model
	// ShopID   uint
	Keyword  string
	Distance float32
	Intent   string
	StoryID  uint32
}

// TableName NlpRecordDomain
func (NlpTrainingRecordDomain) TableName() string {
	return "nlp_training_records"
}
