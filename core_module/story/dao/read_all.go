package dao

// ReadStoryDao ReadStoryDao
type ReadStoryDao struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"desc"`
	AppID       string `json:"app_id"`
	CreateAt    int64  `json:"create_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

// ReadAllStoryDao ReadAllStoryDao
type ReadAllStoryDao []ReadStoryDao
