package gateway

import (
	"bytes"
	"encoding/json"
	"inc-nlp-service-echo/core_module/facebook/dao"
	nlp "inc-nlp-service-echo/core_module/nlprecord"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
)

// HTTPGateway FBWebhookController
type HTTPGateway struct {
	NlpService nlp.Service
}

// NewHTTPGateway NewFBWebhookController
func NewHTTPGateway(e *echo.Group, nlpRecordService nlp.Service) {
	handle := &HTTPGateway{nlpRecordService}

	e.GET("/fb/webhook", handle.VerifyFBWebhookController)
	e.POST("/fb/webhook", handle.ReplyFBWebhookController)
}

// VerifyFBWebhookController VerifyFBWebhookController
func (svc *HTTPGateway) VerifyFBWebhookController(e echo.Context) error {

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
func (svc *HTTPGateway) ReplyFBWebhookController(e echo.Context) error {
	appID := e.QueryParam("app_id")
	facebookWebhookRequest := new(dao.FacebookWebhookRequest)
	e.Bind(&facebookWebhookRequest)

	log.Printf("Received a message: %v", facebookWebhookRequest)

	if facebookWebhookRequest.Object == "page" {

		for index, item := range facebookWebhookRequest.Entry {
			fbTextReply := dao.NewFBTextReplyModel()
			fbTextReply.Recipient.ID = item.Messaging[index].Sender.ID

			nlpModel := svc.NlpService.ReadNlpReply(item.Messaging[index].Message.Text, appID)

			fbTextReply.Message.Text = nlpModel.Intent

			var url = "https://graph.facebook.com/v4.0/me/messages?access_token=EAACl9cSyzQ4BAOYexUfyRJIeNQ4Ya7ofUdC7IX1AMP2njHn9bJyJNOxUdtRGnb5qxWNky96FwrNxqZCWurH62bwQM4YPjQnVdhICOSLFeKmQYwLnZAhSFnGjsTecsrNZBrO6x7IlZB4cWEIaFrP0aqJRwZC7CweipLQ68lcO8ceS9mNZBGAVHq"

			jsonValue, _ := json.Marshal(fbTextReply)
			response, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))

			if err != nil {
				log.Error(err)
			} else {
				data, _ := ioutil.ReadAll(response.Body)

				// data:
				// {recipient_id: string,message_id: string}

				log.Info(string(data))
				// fmt.Println(string(data))
			}
		}
	}

	return e.String(http.StatusOK, "OK")
}
