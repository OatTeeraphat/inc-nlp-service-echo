package domains

import (
	"github.com/jinzhu/gorm"
)

// NlpDashboardDomain NlpDashboardDomain
type NlpDashboardDomain struct {
	gorm.Model
	Keyword        string
	Distance       float32
	KeywordMinhash uint32
	Intent         string
	StoryID        uint32
}

// TableName NlpRecordDomain
func (NlpDashboardDomain) TableName() string {
	return "nlp_dashboards"
}
