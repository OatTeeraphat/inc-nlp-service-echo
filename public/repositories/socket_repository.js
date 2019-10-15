const { WebSocketSubject } = rxjs.webSocket;

class SocketRepository {

    getFillChatNlpReplyModelWS() {
        return new WebSocketSubject({url: getHost() + '/v1/fb/webhook/socket.io'})
    }
}