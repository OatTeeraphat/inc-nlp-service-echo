package websockets

// NlpReplyModelWebSocketInbound NlpReplyModelWebSocketInbound
type NlpReplyModelWebSocketInbound struct {
	Websocket Websocket
}

// NewNlpReplyModelWebSocket NewNlpReplyModelWebSocket
func NewNlpReplyModelWebSocket(ws Websocket) *NlpReplyModelWebSocketInbound {
	return &NlpReplyModelWebSocketInbound{
		Websocket: ws,
	}
}

// ReadLoop ReadLoop
func (ws NlpReplyModelWebSocketInbound) ReadLoop() {
}
