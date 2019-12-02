package dao

// UpdateNlpRecordDao UpdateNlpRecordDao
type UpdateNlpRecordDao struct {
	ID        uint   `json:"id"`
	Keyword   string `json:"keyword"`
	Intent    string `json:"intent"`
	StoryName string `json:"story_name"`
}
