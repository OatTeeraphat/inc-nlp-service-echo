package domains

// ClientDomain ClientDomain
type ClientDomain struct {
	BaseDomain
	Username string `gorm:"type:varchar(255)"`
	Password string `gorm:"type:varchar(255)"`
	Email    string `gorm:"type:varchar(255)"`
}

// TableName StoryDomain
func (ClientDomain) TableName() string {
	return "clients"
}
