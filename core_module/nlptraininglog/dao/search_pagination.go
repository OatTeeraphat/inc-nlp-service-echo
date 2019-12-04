package dao

import "time"

// SearchPaginationDao SearchPaginationDao
type SearchPaginationDao struct {
	Page           string           `json:"page"`
	Limit          string           `json:"limit"`
	Total          string           `json:"total"`
	NlpTrainingLog []NlpTrainingLog `json:"nlp_logs"`
}

// NlpTrainingLog NlpTrainingLog
type NlpTrainingLog struct {
	ID        string    `json:"id"`
	Keyword   string    `json:"keyword"`
	Intent    string    `json:"intent"`
	Distance  float32   `json:"distance"`
	StoryName string    `json:"story_name"`
	UpdatedAt time.Time `json:"updated_at"`
}
