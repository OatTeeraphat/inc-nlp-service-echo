package domains

import (
	"github.com/jinzhu/gorm"
)

// NlpRecordDomain NlpRecordDomain
type NlpRecordDomain struct {
	gorm.Model
	ShopID         uint
	Keyword        string
	KeywordMinhash uint32 `gorm:"index:idx_keyword_minhash"`
	Intent         string
}

// TableName NlpRecordDomain
func (NlpRecordDomain) TableName() string {
	return "nlp_records"
}
