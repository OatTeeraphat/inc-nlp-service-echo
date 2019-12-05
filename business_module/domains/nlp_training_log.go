package domains

import uuid "github.com/satori/go.uuid"

// NlpTrainingLogDomain NlpTrainingLogDomain
type NlpTrainingLogDomain struct {
	BaseDomain
	// AppID   uint
	Keyword        string
	KeywordMinhash uint32
	Distance       float32
	Intent         string
	StoryID        uuid.UUID
}

// TableName NlpRecordDomain
func (NlpTrainingLogDomain) TableName() string {
	return "nlp_training_logs"
}
