package dao

// ReadNlpRecordByStoryIDsDao ReadNlpRecordByStoryIDsDao
type ReadNlpRecordByStoryIDsDao struct {
	Page     string   `json:"page"`
	StoryIDs []string `json:"story_id"`
}

// ReadNlpRecordByStoryIDsResponse ReadNlpRecordByStoryIDsResponse
type ReadNlpRecordByStoryIDsResponse struct {
	Page      string      `json:"page"`
	Limit     string      `json:"limit"`
	Total     string      `json:"total"`
	NLPRecord []NlpRecord `json:"nlp_record"`
}

// NlpRecord NlpRecord
type NlpRecord struct {
	ID        string `json:"id"`
	Keyword   string `json:"keyword"`
	Intent    string `json:"intent"`
	UpdatedAt string `json:"updated_at"`
}
