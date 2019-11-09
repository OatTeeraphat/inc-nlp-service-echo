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
            <div class="col-7">
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
                    <div class="card-body pb-4">
                        <div class="row justify-content-between">
                            <div class="col-12">
                                <div class="media align-item-center">
                                    <div class="media-icon align-self-start mr-3 rounded"><i class="fe fe-cpu"></i></div>
                                    <div class="media-body">
                                        <h3 class="card-title mb-0">
                                            <strong>Incommon Studio</strong>
                                            <button class="btn btn-link">
                                                <i class="fe fe-edit"></i> 
                                                <small><strong>Edit</strong></small>
                                            </button>
                                        </h3>
                                        <p class="text-muted mb-0">Your App Name</p>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="col-6">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <p class="text-muted mb-2 mt-1">Your App Id</p>
                                        <h6 class="card-title mb-0">
                                            <strong>632861333807100</strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <p class="text-muted mb-2 mt-1">App Status</p>
                                        <h6 class="card-title mb-0">
                                            <strong><span class="badge badge-success badge-setting">Active</span></strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <p class="text-muted mb-2 mt-1">App Owner</p>
                                        <h6 class="card-title mb-0">
                                            <strong>Chanasit.B</strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <p class="text-muted mb-2 mt-1">Your Plan</p>
                                        <h6 class="card-title mb-0">
                                            <strong>Unlimited</strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-md-5 pt-2">
                                <div class="align-item-center">
                                    <small class="text-muted">Your App ID</small>
                                    <h4 class="card-title text-purple dashboard-usage mb-0">632861333807100</h4>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            API Setting
                            <button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
                                <small>
                                    <i class="fe fe-info text-muted"></i>
                                </small>
                            </button>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-between">
                            <div class="col-12">
                                <div class="media pb-0">
                                    <div class="media-icon align-self-start mr-3 rounded"><i class="fe fe-shield"></i></div>
                                    <div class="media-body">
                                        <h4 class="card-title mb-0"> <strong>Access Tokens</strong> </h4>
                                        <p class="text-muted mt-1">Generate a API access cridential. </p>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="col-12">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <h5 class="card-title card-title-token mb-0">
                                            <strong>App Secret</strong>
                                        </h5>
                                        <p class="text-muted mb-2 mt-2 mb-3">Secret key for the app. New secret can be issued.</p>
                                        <div class="form-group">
                                            <textarea class="form-control textarea-code" rows="3" readonly>019714fc547f2610fbb3aefae549ae7d</textarea>
                                            <button class="btn btn-purple text-white mt-3" type="button" id="button-addon2"><i class="fe fe-refresh-cw mr-2"></i>Issue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                    <div class="media align-item-center">
                                        <div class="media-body">
                                            <h5 class="card-title card-title-token mb-0">
                                                <strong>App Access Token</strong>
                                            </h5>
                                            <p class="text-muted mb-2 mt-2 mb-3">These tokens do not expire. New tokens can be issued.</p>
                                            <div class="form-group">
                                                <textarea class="form-control textarea-code" rows="3" readonly>Bearer BQLPuITksaUaqtB65O6p/4ahWC3lsu+49OihHOvsFqfBVN3M+3ZvY5L9qEiLwEHcZlm/ouj+gWOVmulcnMLO/LXwM1UO8A4xDCBocmgz7ceIOsr59ysfJAaywtHy3c80Q69EHjZWui2VjhXUAGlN2wdB04t89/1O/w1cDnyilFU=</textarea>
                                                <button class="btn btn-purple text-white mt-3" type="button" id="button-addon2"><i class="fe fe-refresh-cw mr-2"></i>Issue</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            API Setting
                            <button type="button" class="btn btn-link" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
                                <small>
                                    <i class="fe fe-info text-muted"></i>
                                </small>
                            </button>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-between">
                            <div class="col-12">
                                <div class="media pb-0">
                                    <div class="media-icon align-self-start mr-3 rounded"><i class="fe fe-shield"></i></div>
                                    <div class="media-body">
                                        <h4 class="card-title mb-0"> <strong>Access Tokens</strong> </h4>
                                        <p class="text-muted mt-1">Generate a API access cridential. </p>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="col-12">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <h5 class="card-title card-title-token mb-0">
                                            <strong>App Secret</strong>
                                        </h5>
                                        <p class="text-muted mb-2 mt-2 mb-3">Secret key for the app. New secret can be issued.</p>
                                        <div class="form-group">
                                            <textarea class="form-control textarea-code" rows="3" readonly>019714fc547f2610fbb3aefae549ae7d</textarea>
                                            <button class="btn btn-purple text-white mt-3" type="button" id="button-addon2"><i class="fe fe-refresh-cw mr-2"></i>Issue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                    <div class="media align-item-center">
                                        <div class="media-body">
                                            <h5 class="card-title card-title-token mb-0">
                                                <strong>App Access Token</strong>
                                            </h5>
                                            <p class="text-muted mb-2 mt-2 mb-3">These tokens do not expire. New tokens can be issued.</p>
                                            <div class="form-group">
                                                <textarea class="form-control textarea-code" rows="3" readonly>Bearer BQLPuITksaUaqtB65O6p/4ahWC3lsu+49OihHOvsFqfBVN3M+3ZvY5L9qEiLwEHcZlm/ouj+gWOVmulcnMLO/LXwM1UO8A4xDCBocmgz7ceIOsr59ysfJAaywtHy3c80Q69EHjZWui2VjhXUAGlN2wdB04t89/1O/w1cDnyilFU=</textarea>
                                                <button class="btn btn-purple text-white mt-3" type="button" id="button-addon2"><i class="fe fe-refresh-cw mr-2"></i>Issue</button>
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