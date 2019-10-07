const { WebSocketSubject } = rxjs.webSocket;

class WebChatRepository {

    getFillChatNlpReplyModelWS() {
        return new WebSocketSubject({url: getHost() + '/v1/fb/webhook/socket.io'})
    }
}