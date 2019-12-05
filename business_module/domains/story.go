package domains

// StoryDomain StoryDomain
type StoryDomain struct {
	BaseDomain
	Name        string
	Description string
	Owner       string // staff, specific app
}

// TableName StoryDomain
func (StoryDomain) TableName() string {
	return "stories"
}
