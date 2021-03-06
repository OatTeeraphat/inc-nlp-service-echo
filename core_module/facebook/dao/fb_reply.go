package dao

// FBTextReply reply body
type FBTextReply struct {
	Recipient FBRecipientReply `json:"recipient"`
	Message   FBMessageReply   `json:"message"`
}

// FBRecipientReply object body
type FBRecipientReply struct {
	ID string `json:"id"`
}

// FBMessageReply reply txt
type FBMessageReply struct {
	Text string `json:"text"`
}

// NewFBTextReplyModel NewFBTextReplyModel
func NewFBTextReplyModel() *FBTextReply {
	return &FBTextReply{
		Message: FBMessageReply{
			Text: "DEFAULT_MESSAGE",
		},
	}
}
