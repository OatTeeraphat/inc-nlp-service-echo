const { WebSocketSubject } = rxjs.webSocket;
const { debounceTime, map, pipe } = rxjs.operators


let keyword_input = ""
let nlp_model = {
    keyword: "keyword",
    intent: "intent",
    distance: 0,
}

var webChatComponent = new Vue({
    el: '#webchat',
    data: {
        webChatService: new WebChatService(),
        keyword_input: keyword_input,
        nlp_model: nlp_model
    },
    beforeCreated: function() {
        console.log("beforeCreated")
    },
    created: function () {
        console.log("created")
        this.webChatService.subscription(this.nlp_model) 
    },
    methods: {
        onSendNlpKeyword: function() {
            this.webChatService.nextNlpKeyword(this.keyword_input)
            // clear input box
            this.keyword_input = ""

        },
    },
    beforeDestroy: function() {
        console.log("before destroy")
        // this.webChatService.unsubscribe()
    },
    destroy: function() {
        console.log("destroy")
        this.webChatService.unsubscribe()
    }
})