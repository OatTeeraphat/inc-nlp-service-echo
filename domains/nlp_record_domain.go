package domains

import (
	"github.com/jinzhu/gorm"
)

// NlpRecordDomain NlpRecordDomain
type NlpRecordDomain struct {
	gorm.Model
	// ShopID         uint `gorm:"index:idx_shop_id"`
	Keyword        string
	KeywordMinhash uint32 `gorm:"index:idx_keyword_minhash,idx_shop_id"`
	Intent         string
}

// TableName NlpRecordDomain
func (NlpRecordDomain) TableName() string {
	return "nlp_records"
}
