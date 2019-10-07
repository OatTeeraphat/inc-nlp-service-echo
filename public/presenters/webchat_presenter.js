var webChatComponent = new Vue({
    el: '#webchat',
    data: {
        webChatService: new WebChatService(),
        keyword_input: "",
        nlp_model: {
            keyword: "",
            intent: "",
            distance: 0
        },
        chat_logs: []
    },
    created: function () {
        this.subscription = this.webChatService.zipEventSourceSubscription(this.nlp_model, this.chat_logs)
    },
    methods: {
        onSendNlpKeyword: function() {
            this.webChatService.nextNlpKeyword(this.keyword_input)
            this.webChatService.keepWebChatLogs(this.nlp_model)
            this.keyword_input = ""
        },
    },
    beforeDestroy: function() {
        this.subscription.unsubscribe()
    }
})