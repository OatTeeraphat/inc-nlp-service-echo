var nlpRecordsPresenter = Vue.component('nlp-presenter', {    
    template: `
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
                                <a class="dropdown-item" href="#">Select All</a>
                                <a class="dropdown-item" href="#">Save All</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item text-danger" href="#">Delete All</a>
                            </div>
                        </div>
                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <button type="button" class="btn btn-secondary"><i class="fe fe-upload"></i></button>
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
                    <tbody @scroll="infiniteHandler">
                        <tr class="tr-add">
                            <td colspan="5" class="col-12"><strong class="mx-3"><i class="fe fe-plus-circle mr-1"></i> Add Row</strong></td>
                        </tr>
                        <tr class="tr-input d-none">
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
                                <input type="checkbox" value="">
                            </th>
                            <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                            <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                            <td class="col-2"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"></td>
                            <td class="col-1 text-center">
                                <button type="button" class="btn btn-link btn-table hover-danger" title="cancel">
                                    <i class="fe fe-delete"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>    
                <div class="row" v-show="isShowLoadingIndicator">
                    <div class="col-12" style="display:flex; justify-content: center;">
                        <div class="dot-flashing"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            page: 1,
            isShowLoadingIndicator: false,
            nlpRecords: []
        }
    },
    created: function () {
        this.nlpRecordsService = new NlpRecordsService()

        this.nlpRecordsService.getNlpRecordsPagination(this.page).subscribe( it => {
            this.nlpRecords.push(...it.nlp_records)
            this.page = this.page + 1
        })

        this.nlpRecordsService.getNlpRecordsByInfiniteScrollSubject().subscribe( item => {
            if ( !item.cancel ) {
                console.debug(item)
                this.nlpRecords.push(...item.nlp_records)
                this.isShowLoadingIndicator = false
                this.page = this.page + 1
            }
        })

    },
    beforeDestroy: function () {
        this.nlpRecordsService.disposable()
    },
    methods: {
        infiniteHandler: function (event) {
            let {scrollTop, clientHeight, scrollHeight } = event.srcElement

            if (scrollTop + clientHeight >= scrollHeight / 1.2) {
                this.isShowLoadingIndicator = true
                this.nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(this.page)
            }
        }
    },
})