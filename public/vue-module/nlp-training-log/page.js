export const nlpTrainingLog = Vue.component('nlp-training-log-page', {    
    template: `
    <div class="warp" >
        <nav-component></nav-component>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col-12 col-md-9">
                        <div class="">
                            <h2 class="">NLP Logs</h2>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 text-right">
                        <div class="from-search">
                            <!-- // TODO: search by minhash -->
                            <input type="text" class="form-control-plaintext p-0 mt-2" placeholder="Search Here">
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
                                    <button @click="$nlpTrainingLogPresenter.selectAll()" class="dropdown-item">Select All</button>

                                    <button @click="$nlpTrainingLogPresenter.deselectAll()" class="dropdown-item">Deselect All</button>
                                    <div class="dropdown-divider"></div>

                                    <button @click="$nlpTrainingLogPresenter.bulkDelete()" class="dropdown-item text-danger">Delete All</button>
                                </div>
                            </div>
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <div class="btn-group" role="group">
                                    <button id="btnGroupDrop1" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fe fe-download mr-1"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <a class="dropdown-item" href="#">Export Trained Template</a>
                                        <a class="dropdown-item" href="#">Export Selected</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Export All</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 text-right">
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-fixed">
                        <thead>
                            <tr>
                                <th class="col-1" scope="col">#</th>
                                <th class="col-3" scope="col">Sentence</th>
                                <th class="col-3" scope="col">Intent</th>
                                <th class="col-2" scope="col">Story</th>
                                <th class="col-1" scope="col">Distance</th>
                                <th class="col-2 text-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in $nlpTrainingLogPresenter.view.nlpLogs">
                                <th scope="row" class="col-1">
                                    <input :value="item.id" v-model="$nlpTrainingLogPresenter.view.nlpLogsCheckedList.ids" type="checkbox">
                                </th>
                                <td class="col-3"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" readonly v-model="item.keyword"></td>
                                <td class="col-3"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                                <td class="col-2"><input type="text" class="form-control-plaintext p-0" placeholder="Story Here" v-model="item.story_name"></td>
                                <td class="col-1"><input type="text" class="form-control-plaintext p-0 text-center" placeholder="Story Here" readonly v-model="item.distance"></td>
                                <td class="col-2 text-center">
                                    <button type="button" class="btn btn-link btn-table hover-success" title="Cancle">
                                        <i class="fe fe-plus-circle"></i>
                                    </button>
                                    <!-- // TODO: delete one by ID -->
                                    <button @click="$nlpTrainingLogPresenter.deleteByID(item.id)" type="button"class="btn btn-link btn-table hover-danger mr-2" title="Cancle">
                                    <i class="fe fe-delete"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>  
    `,
    data: function () {
        return this.$nlpTrainingLogPresenter.view
    },
    mounted: function () {
        this.$nlpTrainingLogPresenter.onMounted()
    },
    beforeDestroy: function () {
        this.$nlpTrainingLogPresenter.beforeDestroy()
    }
})