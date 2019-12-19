package domains

import uuid "github.com/satori/go.uuid"

// NlpRecordDomain NlpRecordDomain
type NlpRecordDomain struct {
	BaseDomain
	Keyword        string
	KeywordMinhash uint32
	Intent         string
	StoryID        uuid.UUID
	AppID          uuid.UUID
}

// TableName NlpRecordDomain
func (NlpRecordDomain) TableName() string {
	return "nlp_records"
}
