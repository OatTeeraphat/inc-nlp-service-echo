package service

import "github.com/labstack/gommon/log"

// UpdateByIDAndClientID UpdateByIDAndClientID
func (svc Service) UpdateByIDAndClientID(id string) string {
	log.Debug(id)

	return "OK"
}
