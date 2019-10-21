var nlpRecordsPresenter = Vue.component('nlp-presenter', {    
    template: `
    <div class="row">
        <div class="table-responsive">
            <table class="table table-fixed">
                <thead>
                    <tr>
                        <th class="col-1" scope="col">#</th>
                        <th class="col-4" scope="col">Keyword</th>
                        <th class="col-4" scope="col">Intent</th>
                        <th class="col-3" scope="col">Story</th>
                    </tr>
                </thead>
                <tbody @scroll="infiniteHandler">
                    <tr class="tr-input">
                        <th class="col-1" scope="row"></th>
                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here"></td>
                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here"></td>
                        <td class="col-3"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here"></td>
                    </tr>
                    <tr v-for="item in nlp_records">
                        <th class="col-1" scope="row">{{ item.id }}</th>
                        <td class="col-4">{{ item.keyword }}</td>
                        <td class="col-4">{{ item.intent }}</td>
                        <td class="col-3">{{ item.story_name }}</td>
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
    `,
    data: function () {
        return {
            nlp_records: [
                // { id: 1, keyword: 'สวัสดีครับ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 0 },
                // { id: 2, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 3, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 4, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 5, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 6, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 7, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 8, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 9, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 10, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 11, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 12, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 13, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 14, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 15, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 16, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 17, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 18, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 19, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 20, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 21, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                // { id: 22, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
            ]
        }
    },
    created: function () {

        this.infiniteHandler$$ = new BehaviorSubject({ page: 1 })
        this.nlpRecordsService = new NlpRecordsService()

        this.infiniteHandler$$.pipe(
            debounceTime(600),
        ).subscribe( it => {
            console.log(it)
        })

        this.nlpRecordsService.getNlpRecordsPagination().subscribe( it => {
            this.nlp_records = it.nlp_records
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