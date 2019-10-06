class RxSubjectWS {

    fillChatNlpReplyModelWS() {
        return new WebSocketSubject({url: getHost() + '/v1/fb/webhook/socket.io'})
    }
}