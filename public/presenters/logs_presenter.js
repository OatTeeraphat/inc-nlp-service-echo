var logsPresenter = Vue.component('logs-presenter', {    
    template: `
	<div class="warp">
		<nav-component></nav-component>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col-12 col-md-9">
                        <div class="">
                            <h2 class="">Logs</h2>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 text-right">
                        <div class="from-search">
                            <input @change="searchNlpRecordByKeyword" v-model="searchKeyword" type="text" class="form-control-plaintext p-0 mt-2" placeholder="Search Here">
                            <i class="fe fe-search"></i>
                        </div>
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-12 col-md-9">
                        <div class="">
                            <div class="btn-group mr-1">
                                <button type="button" class="btn btn-primary btn-purple dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Bulk Action
                                </button>
                                <div class="dropdown-menu">
                                    <button @click="selectAllNlpRecord" class="dropdown-item">Select All</button>
                                    <button @click="deselectAllNlpRecord" class="dropdown-item">Deselect All</button>
                                    <!-- <button @click="" class="dropdown-item">Save All</button> -->
                                    <div class="dropdown-divider"></div>
                                    <button @click="bulkDeleteNlpRecord" class="dropdown-item text-danger">Delete All</button>
                                </div>
                            </div>
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <div class="btn-group" role="group">
                                    <button id="btnGroupDrop1" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fe fe-download mr-1"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <a class="dropdown-item" href="#">Export All</a>
                                        <a class="dropdown-item" href="#">Export Selected</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 text-right">
                    </div>
                </div>
                <div class="card card-webchat mb-3">
                    <div class="card-body p-4 pb-0">
                        <code class="highlighter-rouge d-block">
                            <span class="text-muted">{{ this.getCurrentTime() }} : <br></span>hi
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div> 
    `,
    data: function () {
        return {

        }
    },
    mounted: function () {
        this.getCurrentTime()
    },
    beforeDestroy: function () {
    },
    methods: {
        getCurrentTime: function() {
            var d = new Date()
            return d.toISOString()
        }
    }
})