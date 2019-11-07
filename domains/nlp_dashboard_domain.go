package domains

import (
	"github.com/jinzhu/gorm"
)

// NlpDashboardDomain NlpDashboardDomain
type NlpDashboardDomain struct {
	gorm.Model
	// Keyword        string
	// KeywordMinhash uint32 `gorm:"index:idx_keyword_minhash"`
	// Intent         string
	// StoryID        uint32 `gorm:"index:idx_keyword_minhash,idx_story_id"`
}

// TableName NlpRecordDomain
func (NlpDashboardDomain) TableName() string {
	return "nlp_dashboards"
}
