package dao

// StoryModel StoryModel
type StoryModel struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"desc"`
	Owner       string `json:"owner"`
	CreateAt    int64  `json:"create_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

// NewStoryModel StoryModel
type NewStoryModel struct {
	Name        string `json:"name"`
	Description string `json:"desc"`
	Owner       string `json:"owner"`
}
