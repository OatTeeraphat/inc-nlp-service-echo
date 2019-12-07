class ViewModel {
    log = [
        {
            "keyword": "สวัสดีครับบบบบบบบบบ",
            "intent": "สวัสดีค่ะพี่ขา",
            "distance": 8,
            "story_id": 1,
            "time": new Date(),
            "destination": "http://localhost:9999/v1/nlp/reply"
        }
    ]
}

export class NlpLoggingPresenter {
    constructor(nlpLoggingService) {
        this.view = new ViewModel()
        this.nlpLoggingService = nlpLoggingService
        // this.socket = new WebSocket(getSocketHost() + '/v1/nlp/dashboard/logging');
    }

    onMounted() {
        let _view = this.view
        

        

    }

    beforeDestroy() {
        // this.socket.close()
    }
}