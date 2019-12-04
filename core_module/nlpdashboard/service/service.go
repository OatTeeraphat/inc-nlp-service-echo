package service

import (
	"fmt"
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/nlpdashboard"
	"inc-nlp-service-echo/core_module/nlpdashboard/dao"

	uuid "github.com/satori/go.uuid"
)

// Service Service
type Service struct {
	nlpDashboardRepository repositories.INlpDashboardRepository
}

// NewService NewService
func NewService(repo repositories.INlpDashboardRepository) nlpdashboard.Service {
	return &Service{
		nlpDashboardRepository: repo,
	}
}

// ReadNlpLogging ReadNlpLogging
func (svc *Service) ReadNlpLogging(ID string) []dao.ReadLoggingDAO {
	fmt.Println("################################################")

	var readLoggingDAO []dao.ReadLoggingDAO

	u2, err := uuid.FromString(ID)
	if err != nil {
		fmt.Printf("Something went wrong: %s", err)
	}

	domain := svc.nlpDashboardRepository.FindGreaterThanByID(u2)

	for _, item := range domain {
		var eachReadLoggingDAO dao.ReadLoggingDAO

		eachReadLoggingDAO.ID = item.ID.String()
		eachReadLoggingDAO.Keyword = item.Keyword
		eachReadLoggingDAO.Intent = item.Intent
		eachReadLoggingDAO.StoryName = "MOCK story name .. "

		readLoggingDAO = append(readLoggingDAO, eachReadLoggingDAO)
	}

	return readLoggingDAO
}
