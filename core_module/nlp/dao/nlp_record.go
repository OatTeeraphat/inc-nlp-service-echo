package dao

import "time"

// CreateNlpRecordModel CreateNLPModel
type CreateNlpRecordModel struct {
	Keyword string `json:"keyword"`
	Intent  string `json:"intent"`
}

// NlpReplyModel NlpReplyModel
type NlpReplyModel struct {
	Keyword  string  `json:"keyword"`
	Intent   string  `json:"intent"`
	Distance float32 `json:"distance"`
	StoryID  uint32  `json:"story_id"`
}

// NewNlpReplyModel NewNlpReplyModel
func NewNlpReplyModel() *NlpReplyModel {
	return &NlpReplyModel{}
}

// NlpRecordPaginationSearchModel NlpRecordPaginationSearchModel
type NlpRecordPaginationSearchModel struct {
	Page       string       `json:"page"`
	Limit      string       `json:"limit"`
	Total      string       `json:"total"`
	NlpRecords []NlpRecords `json:"nlp_records"`
}

// NlpRecords NlpRecords
type NlpRecords struct {
	ID        uint      `json:"id"`
	Keyword   string    `json:"keyword"`
	Intent    string    `json:"intent"`
	StoryName string    `json:"story_name"`
	UpdatedAt time.Time `json:"updated_at"`
}
