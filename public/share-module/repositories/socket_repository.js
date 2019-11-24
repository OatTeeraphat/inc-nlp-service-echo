const { WebSocketSubject } = rxjs.webSocket;

class SocketRepository {

    getFillChatNlpReplyModelWS() {
        return new WebSocketSubject({url: getSocketHost() + '/v1/fb/webhook/socket.io'})
    }
}