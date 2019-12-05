package domains

import uuid "github.com/satori/go.uuid"

// NlpDashboardDomain NlpDashboardDomain
type NlpDashboardDomain struct {
	BaseDomain
	Keyword        string
	Distance       float32
	KeywordMinhash uint32
	Intent         string
	StoryID        uuid.UUID
}

// TableName NlpRecordDomain
func (NlpDashboardDomain) TableName() string {
	return "nlp_dashboards"
}
