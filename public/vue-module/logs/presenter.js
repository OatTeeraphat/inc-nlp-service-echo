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
        this.socket = new WebSocket(getSocketHost() + '/v1/nlp/dashboard/logging');
    }

    onMounted() {
        let _view = this.view
        

        // Connection opened
        this.socket.addEventListener('open', function (event) {
            // socket.send('Hello Server!'); 
            console.log("connected")
        });

        // Listen for messages
        this.socket.addEventListener('message', function (event) {

            // let {keyword, distance, intent, story_id} =  JSON.parse(event.data)
            console.log('Message from server ',  JSON.parse(event.data));

            // _view.log.push(JSON.parse(event.data));
            _view.log = [JSON.parse(event.data), ..._view.log]
        })

        

    }

    beforeDestroy() {
        this.socket.close()
    }
}