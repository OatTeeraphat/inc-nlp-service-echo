package dao

// FacebookWebhookRequest post body request
type FacebookWebhookRequest struct {
	Object string  `json:"object"`
	Entry  []Entry `json:"entry"`
}

// Entry post body request
type Entry struct {
	ID        string      `json:"id"`
	Time      int64       `json:"time"`
	Messaging []Messaging `json:"messaging"`
}

// Messaging Messaging
type Messaging struct {
	Timestamp int64     `json:"timestamp"`
	Sender    Sender    `json:"sender"`
	Recipient Recipient `json:"recipient"`
	Message   Message   `json:"message"`
}

// Message Message
type Message struct {
	MID  string `json:"mid"`
	Text string `json:"text"`
}

// Sender Sender
type Sender struct {
	ID string `json:"id"`
}

// Recipient Recipient
type Recipient struct {
	ID string `json:"id"`
}
