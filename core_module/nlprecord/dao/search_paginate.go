package dao

import "time"

// SearchPaginationDao SearchPaginationDao
type SearchPaginationDao struct {
	Page       string       `json:"page"`
	Limit      string       `json:"limit"`
	Total      string       `json:"total"`
	NlpRecords []NlpRecords `json:"nlp_records"`
}

// NlpRecords NlpRecords
type NlpRecords struct {
	ID        string    `json:"id"`
	Keyword   string    `json:"keyword"`
	Intent    string    `json:"intent"`
	StoryName string    `json:"story_name"`
	UpdatedAt time.Time `json:"updated_at"`
}
