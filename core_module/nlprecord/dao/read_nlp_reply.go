package dao

// ReadNlpReplyDao ReadNlpReplyDao
type ReadNlpReplyDao struct {
	Keyword  string  `json:"keyword"`
	Intent   string  `json:"intent"`
	Distance float32 `json:"distance"`
	StoryID  string  `json:"story_id"`
}

// NewReadNlpReplyDao NewReadNlpReplyDao
func NewReadNlpReplyDao() *ReadNlpReplyDao {
	return &ReadNlpReplyDao{}
}
