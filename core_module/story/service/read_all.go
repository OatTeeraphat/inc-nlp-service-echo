package service

import (
	"inc-nlp-service-echo/business_module/domains"
	"inc-nlp-service-echo/core_module/story/dao"

	uuid "github.com/satori/go.uuid"
)

// ReadAll ReadAll
func (s Service) ReadAll() []dao.ReadStoryDao {
	var storyDomain []domains.StoryDomain
	var readAllStoryDao dao.ReadAllStoryDao

	storyDomain = s.storyRepo.FindAll()

	for _, item := range storyDomain {
		each := dao.ReadStoryDao{}
		each.ID = item.ID.String()
		each.Name = item.Name
		each.Description = item.Description
		each.AppID = uuid.NewV4().String()
		each.CreateAt = item.CreatedAt.Unix()
		each.UpdatedAt = item.UpdatedAt.Unix()

		readAllStoryDao = append(readAllStoryDao, each)
	}

	return readAllStoryDao
}
