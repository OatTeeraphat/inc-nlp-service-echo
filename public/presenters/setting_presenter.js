var settingPresenter = Vue.component('setting-presenter', {    
    template: `
	<div class="warp">
		<nav-component></nav-component>
        <div class="row">
            <div class="col-12 col-md-9 mb-4">
                <div class="">
                    <h2 class="">Setting</h2>
                </div>
            </div>
            <div class="col-12 col-md-3 text-right">
                
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                App Info
                                <button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
                                    <small>
                                        <i class="fe fe-info text-muted"></i>
                                    </small>
                                </button>
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="d-flex pt-2 mb-3">
                                <div class="row mx-1">
                                    <div class="col-11">
                                        <small class="text-muted">Yours App Name</small>
                                        <h5 class="card-title text-bold mb-0">
                                            <input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" value="Incommon Studio">
                                        </h5>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="d-flex pt-2 mb-3">
                                <div class="row mx-1">
                                    <div class="col-11">
                                        <small class="text-muted">Yours App ID</small>
                                        <h5 class="card-title text-bold mb-0">
                                            <input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" value="632861333807100">
                                        </h5>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="d-flex pt-2 mb-3">
                                <div class="row mx-1">
                                    <div class="col-11">
                                        <small class="text-muted">Yours App ID</small>
                                        <h5 class="card-title text-bold mb-0">
                                            <input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" value="632861333807100">
                                        </h5>
                                    </div>
                                </div>
                                <hr>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="col-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            App Info
                            <button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
                                <small>
                                    <i class="fe fe-info text-muted"></i>
                                </small>
                            </button>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row mx-2">
                            <div class="col">
                                <small class="text-muted">Yours App Name</small>
                                <h5 class="card-title text-bold mb-0">
                                    <input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" value="Incommon Studio">
                                </h5>
                                <hr>
                            </div>
                        </div>
                        <div class="row mx-2">
                            <div class="col">
                                <small class="text-muted">App ID</small>
                                <h5 class="card-title text-bold mb-0">
                                    <input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" value="632861333807100">
                                </h5>
                                <hr>
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
            chat_logs: [],
        }
    },
    mounted: function () {
        this.$webChatService.getFillChatNlpReplyModelWS().subscribe( item => {
            console.log(item)
            this.chat_logs.push( new GetNlpChatLogsAdapter().adapt(item))
        })
        this.getCurrentTime()
    },
    beforeDestroy: function () {
        this.$webChatService.disposable()
    },
    methods: {
        onSendNlpKeyword: function () {
            this.$webChatService.nextNlpKeyword(this.keyword_input)
            this.keyword_input = ""
        },
        getCurrentTime: function() {
            var d = new Date()
            return d.toISOString()
        }
    },
})