var webChatPresenter = Vue.component('web-chat-presenter', {    
    template: `
    <div>
        <div class="row">
            <div class="col-12 col-md-9 mb-4">
                <div class="">
                    <h2 class="">Debugger<span class="headline"> - Lets you preview your own service </span></h2>
                </div>
            </div>
            <div class="col-12 col-md-3 text-right">
                
            </div>
        </div>
        <div class="row">
            <div class="col-5">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title d-none"></h3>
                        <div class="d-flex justify-content-between">
                            <h4><span class="badge badge-primary btn-purple px-2">NLP API</span></h4>
                            <button type="button" class="btn btn-link hover-alert btn-card-webchat mb-2 text-muted" title="Clear Current Logs">
                                <small>
                                    <i class="fe fe-more-vertical"></i>
                                </small>
                            </button>
                        </div>
                        <p class="card-text">Natural Language is accessible via our REST API.</p>
                        <div class="input-group">
                            <input  @keyup.13="onSendNlpKeyword()" type="text" class="form-control" placeholder="Enter Sentence, To Be Analyze">
                            <div class="input-group-append">
                                <button @click="onSendNlpKeyword()" class="btn btn-purple text-white" type="button" id="button-addon2">Analyze</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-7">
                <div class="card card-webchat mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex justify-content-between align-item-start">
                                    <h6 class="card-title"><strong>Inspect</strong></h6>
                                    <button type="button" class="btn btn-link hover-alert btn-card-webchat mb-2 text-muted" title="Clear Current Logs">
                                        <small>
                                            <i class="fe fe-more-vertical"></i>
                                        </small>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="warpper">
                                    <div class="card">
                                        <div class="card-body">
                                            <code class="highlighter-rouge d-block">
                                                <span class="text-muted">{{ this.current_time }} : <br></span>hi
                                            </code>
                                            <code class="highlighter-rouge d-block" v-for="item in chat_logs" >
                                                <span class="text-muted">10/24/2019, 10:20:12 PM : <br></span>{ keyword: "", intent: "", distance: 0 }
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-webchat mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex justify-content-between align-item-start">
                                    <h6 class="card-title"><strong>Logging</strong></h6>
                                    <button type="button" class="btn btn-link hover-alert btn-card-webchat mb-2 text-muted" title="Clear Current Logs">
                                        <small>
                                            <i class="fe fe-more-vertical"></i>
                                        </small>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="warpper">
                                    <div class="card">
                                        <div class="card-body">
                                            <code class="highlighter-rouge d-block">
                                                <span class="text-muted">{{ this.current_time }} : <br></span>hi
                                            </code>
                                            <code class="highlighter-rouge d-block" v-for="item in chat_logs" >
                                                <span class="text-muted">10/24/2019, 10:20:12 PM : <br></span>{ keyword: "", intent: "", distance: 0 }
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        

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
            chat_logs: [],
            current_time : ""
        }
    },
    methods: {
        onSendNlpKeyword: function () {
            this.webChatService.nextNlpKeyword(this.keyword_input)
            this.webChatService.keepWebChatLogs(this.nlp_model)
            this.keyword_input = ""
        },
        getCurrentTime: function() {
            var d = new Date();
            this.current_time = d.toLocaleString();
        }
    },
    created: function () {
        this.webChatService = new WebChatService()
        this.subscription = this.webChatService.zipEventSourceSubscription(this.chat_logs)
        this.getCurrentTime()
    },
    beforeDestroy: function () {
        this.subscription.unsubscribe()
    }
})