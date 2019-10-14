package models

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
