package domains

import uuid "github.com/satori/go.uuid"

// NlpRecordDomain NlpRecordDomain
type NlpRecordDomain struct {
	BaseDomain
	Keyword        string
	KeywordMinhash uint32 `gorm:"index:idx_keyword_minhash"`
	Intent         string
	StoryID        uuid.UUID `gorm:"index:idx_keyword_minhash,idx_story_id"`
	AppID          uuid.UUID
}

// TableName NlpRecordDomain
func (NlpRecordDomain) TableName() string {
	return "nlp_records"
}
