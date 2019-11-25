package controller

import (
	"bytes"
	"encoding/json"
	"inc-nlp-service-echo/core_module/facebook"
	"inc-nlp-service-echo/core_module/facebook/dao"
	"inc-nlp-service-echo/core_module/nlp"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	log "github.com/sirupsen/logrus"
)

// FBWebhookController FBWebhookController
type FBWebhookController struct {
	NlpService        nlp.INlpRecordService
	WebSocketUpgrader websocket.Upgrader
}

// NewFBWebhookController NewFBWebhookController
func NewFBWebhookController(nlpRecordService nlp.INlpRecordService, ws websocket.Upgrader) facebook.IFBWebhookController {
	return &FBWebhookController{nlpRecordService, ws}
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
	shopID := e.QueryParam("shop_id")
	facebookWebhookRequest := new(dao.FacebookWebhookRequest)
	e.Bind(&facebookWebhookRequest)

	log.Printf("Received a message: %v", facebookWebhookRequest)

	if facebookWebhookRequest.Object == "page" {

		for index, item := range facebookWebhookRequest.Entry {
			fbTextReply := dao.NewFBTextReplyModel()
			fbTextReply.Recipient.ID = item.Messaging[index].Sender.ID

			nlpModel := svc.NlpService.ReadNlpReplyModelService(item.Messaging[index].Message.Text, shopID)

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

// ReplyFBWebhookSocketIO ReplyFBWebhookSocketIO
func (svc *FBWebhookController) ReplyFBWebhookSocketIO(c echo.Context) error {
	ws, err := svc.WebSocketUpgrader.Upgrade(c.Response(), c.Request(), nil)

	log.Debug("socket connected")

	if err != nil {
		return err
	}

	defer ws.Close()

	for {
		_, msg, err := ws.ReadMessage()

		stringMsg := string(msg)
		log.Debug(stringMsg)

		go func(msg []byte) {

			if err != nil {
				log.Error(err)
			}
			if string(msg) != "" {
				nlpResult := svc.NlpService.ReadNlpReplyModelService(stringMsg, "1")

				log.Info(nlpResult)

				data, _ := json.Marshal(nlpResult)

				// Write
				err := ws.WriteMessage(websocket.TextMessage, []byte(data))
				if err != nil {
					log.Error(err)
				}
			}
		}(msg)
	}

}

func readLoop(c *websocket.Conn) {
	for {
		if _, _, err := c.NextReader(); err != nil {
			c.Close()
			break
		}
	}
}
