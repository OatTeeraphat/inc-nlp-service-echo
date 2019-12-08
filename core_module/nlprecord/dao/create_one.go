package dao

// CreateNlpRecordDao CreateNlpRecordDao
type CreateNlpRecordDao struct {
	Keyword   string `json:"keyword"`
	Intent    string `json:"intent"`
	StoryName string `json:"story_name"`
}

// CreateNlpResponse CreateNlpResponse
type CreateNlpResponse struct {
	ID        string `json:"id"`
	Intent    string `json:"intent"`
	Keyword   string `json:"keyword"`
	StoryName string `json:"story_name"`
	UpdatedAt string `json:"updated_at"`
}
