package domains

import uuid "github.com/satori/go.uuid"

// NlpTrainingLogDomain NlpTrainingLogDomain
type NlpTrainingLogDomain struct {
	BaseDomain
	AppID          uuid.UUID
	StoryID        uuid.UUID
	Keyword        string
	KeywordMinhash uint32
	Distance       float32
	Intent         string
}

// TableName NlpRecordDomain
func (NlpTrainingLogDomain) TableName() string {
	return "nlp_training_logs"
}
