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

var webChatComponent = Vue.component('web-chat-component', {
    template: `
    <div id="webchat">
            
        <div v-for="item in chat_logs">
            <span> {{ item.intent }} </span>
        </div>

        <input class="input is-small" @keyup.13="onSendNlpKeyword()" type="text" v-model="keyword_input" placeholder="input your keyword"/>
        <button class="button is-dark" is-primary is-large @click="onSendNlpKeyword()">Greet</button>
    </div> 
    `,
    data: () => {
        return data
    },
    created: function () {
        this.subscription = webChatService.zipEventSourceSubscription(this.nlp_model, this.chat_logs)
    },
    methods: {
        onSendNlpKeyword:    function() {
            webChatService.nextNlpKeyword(this.keyword_input)
            webChatService.keepWebChatLogs(this.nlp_model)
            this.keyword_input = ""
        }
    },
    beforeDestroy: function() {
        this.subscription.unsubscribe()
    }
})