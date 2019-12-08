const { WebSocketSubject, webSocket } = rxjs.webSocket;


export class SocketRepository {

    getFillChatNlpReplyModelWS() {
        return new WebSocketSubject({url: getSocketHost() + '/v1/fb/webhook/socket.io'})
    }
    
    getNlpDashboardLogging() {
        return webSocket({
            url: getSocketHost() + '/v1/nlp/dashboard/logging',
            openObserver: {
                next: () => {
                    console.log('connetion ok');
                }
            },
            closeObserver: {
                next: () => {
                    console.log('websocket subscription')
                }
            }
        })
    }
}