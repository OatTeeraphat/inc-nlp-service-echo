package service

import (
	"fmt"
	"github.com/labstack/gommon/log"
	"inc-nlp-service-echo/business_module/repositories"
	"inc-nlp-service-echo/core_module/nlpdashboard"
	"inc-nlp-service-echo/core_module/nlpdashboard/dao"
	"strconv"
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

	int64, err := strconv.ParseUint(ID, 10, 32)

	if err != nil {
		log.Error(err)
	}

	domain := svc.nlpDashboardRepository.FindGreaterThanByID(uint(int64))

	for _, item := range domain {
		var eachReadLoggingDAO dao.ReadLoggingDAO

		eachReadLoggingDAO.ID = strconv.FormatUint(uint64(item.ID), 10)
		eachReadLoggingDAO.Keyword = item.Keyword
		eachReadLoggingDAO.Intent = item.Intent
		eachReadLoggingDAO.StoryName = "MOCK story name .. "

		readLoggingDAO = append(readLoggingDAO, eachReadLoggingDAO)
	}

	return readLoggingDAO
}
