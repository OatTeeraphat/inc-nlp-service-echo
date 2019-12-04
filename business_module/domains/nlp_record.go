package domains

import (
	"github.com/jinzhu/gorm"
)

// NlpRecordDomain NlpRecordDomain
type NlpRecordDomain struct {
	gorm.Model
	Keyword        string
	KeywordMinhash uint32 `gorm:"index:idx_keyword_minhash"`
	Intent         string
	StoryID        uint32 `gorm:"index:idx_keyword_minhash,idx_story_id"`
}

// TableName NlpRecordDomain
func (NlpRecordDomain) TableName() string {
	return "nlp_records"
}
