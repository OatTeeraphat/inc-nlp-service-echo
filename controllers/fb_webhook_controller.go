package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"inc-nlp-service-echo/models"
	"inc-nlp-service-echo/services"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

// FBWebhookController FBWebhookController
type FBWebhookController struct {
	NlpService services.INlpRecordService
}

// IFBWebhookController IFBWebhookController
type IFBWebhookController interface {
	VerifyFBWebhookController(e echo.Context) error
	ReplyFBWebhookController(e echo.Context) error
}

// NewFBWebhookController NewFBWebhookController
func NewFBWebhookController(nlpRecordService services.INlpRecordService) IFBWebhookController {
	return &FBWebhookController{nlpRecordService}
}

// VerifyFBWebhookController VerifyFBWebhookController
func (svc *FBWebhookController) VerifyFBWebhookController(e echo.Context) error {

	verifyToken := e.QueryParam("hub.verify_token")

	if verifyToken != "secret!" {
		return e.String(http.StatusUnauthorized, "verify failed")
	}

	challenge := e.QueryParam("hub.challenge")

	if challenge == "" {
		return e.String(http.StatusUnauthorized, "verify failed")
	}

	return e.String(http.StatusOK, challenge)
}

// ReplyFBWebhookController ReplyFBWebhookController
func (svc *FBWebhookController) ReplyFBWebhookController(e echo.Context) error {
	facebookWebhookRequest := new(models.FacebookWebhookRequest)
	e.Bind(&facebookWebhookRequest)

	log.Printf("Received a message: %v", facebookWebhookRequest)

	if facebookWebhookRequest.Object == "page" {

		for index, item := range facebookWebhookRequest.Entry {
			fbTextReply := &models.FBTextReply{}
			fbTextReply.Recipient.ID = item.Messaging[index].Sender.ID
			fbTextReply.Message.Text = "DEFAULT_MESSAGE"

			nlpModel := svc.NlpService.ReadNlpReplyModel(item.Messaging[index].Message.Text, "1")

			if nlpModel.Intent != "" {
				fbTextReply.Message.Text = nlpModel.Intent
			}

			var url = "https://graph.facebook.com/v4.0/me/messages?access_token=EAACl9cSyzQ4BAGuSYwZCCtZB5BG36hX6E88eGeWBAQ5QEBiIAteaczZCC1W5qNqmhXeZBrJ6cbgAQErDwgScrEsRMUoU4Cn7rZA6y4KdoQhYwneHsjyJLMZBNZAiss0CTuokgFiB5ODlvxX3aMh7rYxdzzSsYCSONiThp9D7AsFMCL2OGCH295ZB"

			jsonValue, _ := json.Marshal(fbTextReply)
			response, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))

			if err != nil {
				fmt.Printf("The HTTP request failed with error %s\n", err)
			} else {
				data, _ := ioutil.ReadAll(response.Body)
				fmt.Println(string(data))
			}
		}
	}

	return e.String(http.StatusOK, "OK")
}
