var webChatPresenter = Vue.component('web-chat-presenter', {    
    template: `
    <div>
        <div v-for="item in chat_logs">
            <span> {{ item.intent }} </span>
        </div>

        <input class="input is-small" @keyup.13="onSendNlpKeyword()" type="text" v-model="keyword_input" placeholder="input your keyword"/>
        <button class="button is-dark" is-primary is-large @click="onSendNlpKeyword()">Greet</button>
    </div> 
    `,
    data: function () {
        return {
            keyword_input: "",  
            nlp_model: {
                keyword: "",
                intent: "",
                distance: 0
            },
            chat_logs: []
        }
    },
    created: function () {
        this.webChatService = new WebChatService()
        this.subscription = this.webChatService.zipEventSourceSubscription(this.nlp_model, this.chat_logs)
    },
    methods: {
        onSendNlpKeyword: function () {
            this.webChatService.nextNlpKeyword(this.keyword_input)
            this.webChatService.keepWebChatLogs(this.nlsp_model)
            this.keyword_input = ""
        }
    },
    beforeDestroy: function () {
        this.subscription.unsubscribe()
    }
})