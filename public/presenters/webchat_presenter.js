const { WebSocketSubject } = rxjs.webSocket;
const { debounceTime, map, pipe } = rxjs.operators

let webChatService =  new WebChatService()

var webChatComponent = new Vue({
    el: '#webchat',
    data: {
        keyword_input: '',
        nlp_model: {
            keyword: "keyword",
            intent: "intent",
            distance: 0,
        }
    },
    beforeCreated: function() {
    },
    created: function () { 
        webChatService.subscription(this.nlp_model) 
    },
    methods: {
        onSendNlpKeyword: function() {
            webChatService.nextNlpKeyword(this.keyword_input)
            // clear input box
            this.keyword_input = ""
        },
    },
    beforeDestroy: function() {
        console.log("before destroy")
        webChatService.unsubscribe()
    }
})