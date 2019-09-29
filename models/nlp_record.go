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
	Distance float64 `json:"distance"`
}

// NewNlpReplyModel NewNlpReplyModel
func NewNlpReplyModel() *NlpReplyModel {
	return &NlpReplyModel{
		Keyword: "",
	}
}
