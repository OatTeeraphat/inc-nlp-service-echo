var webChatService = new WebChatService()

var data = {
    keyword_input: "",
    nlp_model: {
        keyword: "keyword",
        intent: "intent",
        distance: 0
    },
    chat_logs: [
        {
            keyword: "keyword",
            intent: "intent",
        },
        {
            keyword: "keyword",
            intent: "intent", 
        },
        {
            keyword: "keyword",
            intent: "intent", 
        }
    ]
}

var webChatComponent = new Vue({
    el: '#webchat',
    data: data,
    created: function () {
        this.subscription = webChatService.zipEventSourceSubscription(this.nlp_model, this.chat_logs)
    },
    methods: {
        onSendNlpKeyword: function() {
            webChatService.nextNlpKeyword(this.keyword_input)
            webChatService.keepWebChatLogs(this.nlp_model)
            this.keyword_input = ""
        }
    },
    beforeDestroy: function() {
        this.subscription.unsubscribe()
    }
})