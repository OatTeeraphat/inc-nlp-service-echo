var nlpRecordsPresenter = Vue.component('nlp-presenter', {    
    template: `
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-12 col-md-9">
                    <div class="mt-3 mb-4">
                        <h4 class="">NLP Training Set</h4>
                    </div>
                </div>
                <div class="col-12 col-md-3 text-right pt-3">
                    <i class="fe fe-search"></i>
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
                        <tr class="tr-input">
                            <th scope="row" class="col-1">
                                <button type="button" class="btn btn-link hover-danger" title="Cancle">
                                    <i class="fe fe-x text-danger"></i>
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
                                <button type="button" class="btn btn-link hover-success" title="Add Row">
                                    <i class="fe fe-plus-circle"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-for="item in nlp_records">
                            <th scope="row" class="col-1">{{ item.id }}</th>
                            <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                            <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                            <td class="col-2"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"></td>
                            <td class="col-1 text-center">
                                <button type="button" class="btn btn-link hover-danger" title="Cancle">
                                    <i class="fe fe-delete"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            is_load_more: false,
            page: 1,
            nlp_records: []
        }
    },
    created: function () {

        this.infiniteHandler$$ = new Subject()
        this.nlpRecordsService = new NlpRecordsService()

        this.nlpRecordsService.getNlpRecordsPagination()
        .subscribe( it => {
            this.nlp_records.push(...it.nlp_records)
        })

        this.infiniteHandler$$.pipe( map ( it => it.srcElement ) )
        .subscribe( it => {
            if (it.scrollTop + it.clientHeight >= it.scrollHeight) {
                this.page ++
                this.nlpRecordsService.getNlpRecordsPagination()
                .subscribe( it => {
                    this.nlp_records.push(...it.nlp_records)
                })
            } 
        })

    },
    beforeDestroy: function () {
        this.infiniteHandler$$.complete()
    },
    methods: {
        infiniteHandler: function (event) {
            this.infiniteHandler$$.next(event)
        }
    },
})