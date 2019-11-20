var settingPage = Vue.component('setting-page', {    
    template: `
	<div class="warp">
		<nav-component></nav-component>
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
                                        <h3 class="card-title mb-0" v-bind:class="{ 'd-none' : is_edit.app_info }" >
                                            <strong>
                                                <input type="text" v-model="app_info.name" readonly="readonly" class="form-control-plaintext input-nostyle">
                                            </strong>
                                            <button class="btn btn-link" @click="onEditAppInfo()">
                                                <i class="fe fe-edit"></i> 
                                                <small><strong>Edit</strong></small>
                                            </button>
                                        </h3>
                                        <h3 class="card-title mb-0" v-bind:class="{ 'd-none' : !is_edit.app_info }">
                                            <strong>
                                                <input type="text" v-model="app_info.name" ref="info"  class="form-control-plaintext input-nostyle">
                                            </strong>
                                            <button class="btn btn-link" @click="onSaveAppInfo()">
                                                <i class="fe fe-save"></i> 
                                                <small><strong>Save</strong></small>
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
                            NLP Setting
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
                                    <div class="media-icon align-self-start mr-3 rounded"><i class="fe fe-book-open"></i></div>
                                    <div class="media-body">
                                        <h4 class="card-title mb-0"> <strong>NLP Service</strong> </h4>
                                        <p class="text-muted mt-1">Generate a API access cridential. </p>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="col-12">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <h5 class="card-title card-title-token mb-0">
                                            <strong>Confidence</strong>
                                        </h5>
                                        <p class="text-muted mb-2 mt-2">You can decide how precisely your nlp.</p>
                                        <h1 class="text-purple mb-2 mt-2 position-relative" >
                                            <span v-bind:class="{ 'd-none': !is_edit.confidence }" >
                                                <strong>
                                                    <input type="text" class="form-control-plaintext input-nostyle input-2digit" readonly v-model="confidence">
                                                </strong>
                                                <div class="btn-group input-adjust btn-group-sm" role="group" aria-label="Basic example">
                                                    <button @click="onAdjustConfidence(1)" type="button" class="btn btn-secondary"><i class="fe fe-chevron-up"></i></button>
                                                    <button @click="onAdjustConfidence(-1)" type="button" class="btn btn-dark"><i class="fe fe-chevron-down"></i></button>
                                                </div>
                                                <button class="btn btn-link btn-edit text-success" @click="onSaveConfidence()" ><i class="fe fe-save"></i> <small><strong>Save</strong></small></button>
                                            </span>
                                            <span v-bind:class="{ 'd-none': is_edit.confidence }">
                                                <strong>
                                                    <input type="text" class="form-control-plaintext input-nostyle input-2digit text-purple" readonly  v-model="confidence">
                                                </strong>
                                                <small class="input-2digit-sign">%</small>
                                                <button class="btn btn-link btn-edit" @click="onEditConfidence()" ><i class="fe fe-edit"></i> <small><strong>Edit</strong></small></button>
                                            </span>
                                        </h1>
                                        <p class="text-muted mb-2 mt-2 setting-desc">System analyses its accuracy and response a result with the most match score than confidence score.</p>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="col-12 mb-3">
                                <div class="media align-item-center">
                                    <div class="media-body">
                                        <h5 class="card-title card-title-token mb-0">
                                            <strong>Debugger</strong>
                                        </h5>
                                        <p class="text-muted mt-2 mb-0">Natural Language is accessible via our REST API.</p>
                                        <div class="from-search pr-0">
                                            <input type="text" v-model="keyword_input" placeholder="Sentence, To Be Analyze" class="form-control-plaintext p-0 mt-4 setting-input" >
                                            <button class="btn btn-link btn-edit" @click="onSendNlpKeyword()" ><i class="fe fe-box"></i> <small><strong>GO</strong></small></button>
                                        </div>
                                        <div class="warpper mt-4">
                                            <div class="card setting-warpper">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-9">
                                                            <h2>hi <i class="fe fe-chevrons-right"></i> hello</h2>
                                                        </div>
                                                    </div>
                                                    <p class="mb-2">98.887% of confidence</p>
                                                    <hr>
                                                    <p class="mb-2"><strong>Proximity : k=3</strong></p>
                                                    <code><p class="mb-0">hi <i class="fe fe-chevrons-right"></i> hello (98.887% of confidence)</p></code>
                                                    <code><p class="mb-0">hi <i class="fe fe-chevrons-right"></i> hello (98.887% of confidence)</p></code>
                                                    <code><p class="mb-0">hi <i class="fe fe-chevrons-right"></i> himom (98.27% of confidence)</p></code>
                                                    <hr>
                                                    <p class="mb-2"><strong>Performance Static</strong></p>
                                                    <code><p class="mb-0">found in 0.93μsec</p></code>
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
        </div>

    </div> 
    `,
    data: function () {
        return {
            keyword_input: "",
            chat_logs: [],
            is_edit : {
                confidence : false,
                app_info : false
            },
            confidence: 0,
            app_info : {}
        }
    },
    mounted: function () {

        this.$webChatService.getFillChatNlpReplyModelWS().subscribe( item => {
            console.log(item)
            this.chat_logs.push( new GetNlpChatLogsAdapter().adapt(item) )
        })

        this.$settingService.getNlpConfidenceByClientId().subscribe(item => {
            this.confidence = item.confidence
        })

        this.$settingService.getAppInfoByClientId().subscribe(item => {
            this.app_info = item
        })

        this.$settingService.setNlpConfidenceByClientID().subscribe()
        this.$settingService.setAppInfoByClientId().subscribe()
        // this.$settingService.editAppInfo().subscribe()

        this.getCurrentTime()
        
    },
    beforeDestroy: function () {
        this.$webChatService.disposable()
    },
    methods: {
        
        onSaveConfidence: function () {
            this.$settingService.nextNlpConfidenceByClientId()
            this.is_edit.confidence = false
        },

        onEditConfidence: function () {
            this.is_edit.confidence = true
        },

        onAdjustConfidence: function (adjust) {
            let newAdjust = this.confidence + parseInt(adjust)
            if (newAdjust > 0 && newAdjust < 99){
                this.confidence = newAdjust
            }
        },

        onSaveAppInfo: function () {
            this.$settingService.nextAppInfoByClientId(this.app_info)
            this.is_edit.app_info = false
        },

        onEditAppInfo: function () {
            
            let toggleDelay = of({}).pipe(delay(200))
            toggleDelay.subscribe(() => this.$refs.info.focus())

            this.is_edit.app_info = true
        },

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