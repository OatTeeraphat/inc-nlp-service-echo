package domains

import (
	"github.com/jinzhu/gorm"
)

// NlpTrainingLogDomain NlpTrainingLogDomain
type NlpTrainingLogDomain struct {
	gorm.Model
	// AppID   uint
	Keyword        string
	KeywordMinhash uint32
	Distance       float32
	Intent         string
	StoryID        uint32
}

// TableName NlpRecordDomain
func (NlpTrainingLogDomain) TableName() string {
	return "nlp_training_logs"
}
