var nlpRecordsPresenter = Vue.component('nlp-presenter', {    
    template: `
    <div class="warp" >
        <nav-component></nav-component>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col-12 col-md-9">
                        <div class="">
                            <h2 class="">NLP Training Set</h2>
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
                                    <button id="btnGroupDrop" type="button" class="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fe fe-upload mr-1"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-file" aria-labelledby="btnGroupDrop">
                                        <strong>Upload Training Set</strong>
                                        <div class="custom-file mt-2 mb-1">
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                            <input type="file" class="custom-file-input" id="customFile">
                                        </div>
                                        <small class="text-muted">XLSX file max size 20 mb</small>
                                    </div>
                                </div>
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
                <div class="table-responsive">
                    <table class="table table-fixed">
                        <thead>
                            <tr>
                                <th class="col-1" scope="col">#</th>
                                <th class="col-4" scope="col">Sentence</th>
                                <th class="col-4" scope="col">Intent</th>
                                <th class="col-2" scope="col">Story</th>
                                <th class="col-1 text-center" scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody v-if="searchKeywordComputed === '' " @scroll="infiniteHandler">
                            <tr class="tr-add">
                                <td colspan="5" class="col-12"><strong class="mx-3"><i class="fe fe-plus-circle mr-1"></i> Add Row</strong></td>
                            </tr>
                            <tr class="tr-input">
                                <th scope="row" class="col-1">
                                    <button type="button" class="btn btn-table btn-link hover-danger" title="Cancle">
                                        <i class="fe fe-x text-danger "></i>
                                    </button>
                                </th>
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Sentence Here"></td>
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here"></td>
                                <td class="col-2">
                                    <div class="form-group tr-dropdown mb-0">
                                        <select class="form-control form-control-sm" id="exampleFormControlSelect1" required>
                                            <option value="" disabled selected hidden>Story Here</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="col-1 text-center">
                                    <button type="button" class="btn btn-link btn-table hover-success" title="Add Row">
                                        <i class="fe fe-plus-circle"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-for="item in nlpRecords">
                                <th scope="row" class="col-1">
                                    <input :value="item.id" v-model="nlpRecordsCheckedList.ids" type="checkbox">
                                </th>
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                                <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                                <td class="col-2"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"></td>
                                <td class="col-1 text-center">
                                    <button @click="deleteNlpRecordByID(item.id)" type="button" class="btn btn-link btn-table hover-danger" title="cancel">
                                        <i class="fe fe-delete"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-else>
                            <tr class="tr-add">
                                    <td colspan="5" class="col-12"><strong class="mx-3"><i class="fe fe-plus-circle mr-1"></i> Add Row</strong></td>
                                </tr>
                                <tr class="tr-input">
                                    <th scope="row" class="col-1">
                                        <button type="button" class="btn btn-table btn-link hover-danger" title="Cancle">
                                            <i class="fe fe-x text-danger "></i>
                                        </button>
                                    </th>
                                    <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Sentence Here"></td>
                                    <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here"></td>
                                    <td class="col-2">
                                        <div class="form-group tr-dropdown mb-0">
                                            <select class="form-control form-control-sm" id="exampleFormControlSelect1" required>
                                                <option value="" disabled selected hidden>Story Here</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="col-1 text-center">
                                        <button type="button" class="btn btn-link btn-table hover-success" title="Add Row">
                                            <i class="fe fe-plus-circle"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-for="item in nlpRecordsByKeyword">
                                    <th scope="row" class="col-1">
                                        <input :value="item.id" v-model="nlpRecordsByKeywordCheckedList.ids" type="checkbox">
                                    </th>
                                    <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                                    <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                                    <td class="col-2"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"></td>
                                    <td class="col-1 text-center">
                                        <button @click="deleteNlpRecordByID(item.id)" type="button" class="btn btn-link btn-table hover-danger" title="cancel">
                                            <i class="fe fe-delete"></i>
                                        </button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                    <div class="row" v-show="isShowLoadingIndicator">
                        <div class="col-12 dot-flashing-center">
                            <div class="dot-flashing"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            isShowLoadingIndicator: false,

            page: 1,
            limit: 1,
            total: 0,
            nlpRecords: [],
            nlpRecordsCheckedList: { ids: [] },
            
            searchKeyword: "",
            searchPage: 1,
            searchLimit: 1,
            searchTotal: 0,
            nlpRecordsByKeyword: [],
            nlpRecordsByKeywordCheckedList: { ids: [] },

            searchRecently: {}
        }
    },
    mounted: function () {
        this.subscription = this.$nlpRecordsService.getNlpRecordsByInfiniteScrollSubject().subscribe( 
            item => {
                this.nlpRecords.push(...item.nlp_records)
                this.page = this.page + 1
                this.isShowLoadingIndicator = false
            },
            error => {
                this.isShowLoadingIndicator = false
            }
        )
        this.$nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(this.page)
        // this.getNlpRecordByKeywordHistory()
    },
    methods: {
        infiniteHandler: function (event) {
            let {scrollTop, clientHeight, scrollHeight } = event.srcElement
            if (scrollTop + clientHeight >= scrollHeight / 1.2) {
                this.isShowLoadingIndicator = true
                this.$nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(this.page)
            }
        },
        selectAllNlpRecord: function(event) {
            this.nlpRecordsCheckedList.ids = []
            this.nlpRecords.forEach( select => { this.nlpRecordsCheckedList.ids.push(select.id) })
        },
        deselectAllNlpRecord: function(event) {
            this.nlpRecordsCheckedList.ids = []
        },
        bulkDeleteNlpRecord: function(event) {
            // bulk delete
            this.$nlpRecordsService.bulkDeleteNlpRecordsByIDs(this.nlpRecordsCheckedList.ids).subscribe( () => {
                this.nlpRecords = this.nlpRecords.filter( item => !this.nlpRecordsCheckedList.ids.includes(item.id) )
                console.log(this.nlpRecordsCheckedList)
                this.nlpRecordsCheckedList.ids = []
            })
            // next page event
            this.$nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(this.page)
        },
        deleteNlpRecordByID: function (id) {
            this.$nlpRecordsService.deleteNlpRecordByID(id).subscribe( () =>  this.nlpRecords = this.nlpRecords.filter( item => item.id !== id) )
        },
        searchNlpRecordByKeyword: function(event)  {
            console.log(event.target.value)

            let keyword = event.target.value

            this.$nlpRecordsService.getNlpRecordsPaginationByKeyword(keyword, 1).subscribe( it => {

                this.nlpRecordsByKeyword.push(...it.nlp_records)
            })
        },
        getNlpRecordByKeywordHistory: function() {
            this.$nlpRecordsService.getRecentlyNlpRecordHistory().subscribe( it => {
                this.searchRecently = it
            })
        }
    },
    computed: {
        searchKeywordComputed: function(e) {
            this.searchPage = 1
            this.nlpRecordsByKeyword = []
            this.nlpRecordsByKeywordCheckedList = { ids: [] }

            return this.searchKeyword
        }
    },
    beforeDestroy: function () {
        this.subscription.unsubscribe()
        this.nlpRecords = []
        this.nlpRecordsByKeyword = []
    },
})