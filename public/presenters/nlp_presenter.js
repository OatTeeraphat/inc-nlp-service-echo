nlpPresenter = Vue.component('nlp-presenter', {    
    template: `
    <div class="row">
        <div class="table-responsive">
            <table class="table table-fixed">
                <thead>
                    <tr>
                        <th class="col-1" scope="col">#</th>
                        <th class="col-5" scope="col">Keyword</th>
                        <th class="col-4" scope="col">Intent</th>
                        <th class="col-2" scope="col">Story</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="tr-input">
                        <th scope="row" class="col-1"></th>
                        <td class="col-5"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here"></td>
                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here"></td>
                        <td class="col-2">
                            
                            <div class="form-group tr-dropdown mb-0">
                                <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                                <option>Story Here</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="item in nlp_records">
                        <th scope="row" class="col-1">{{ item.id }}</th>
                        <td class="col-5"><input type="text" class="form-control-plaintext p-0" placeholder="Keyword Here" v-model="item.keyword"></td>
                        <td class="col-4"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.intent"></td>
                        <td class="col-2"><input type="text" class="form-control-plaintext p-0" placeholder="Intent Here" v-model="item.story_name"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data: function () {
        return {
            nlp_records: [
                { id: 1, keyword: 'สวัสดีครับ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 0 },
                { id: 2, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 3, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 4, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 5, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 6, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 7, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 8, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 9, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 10, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 11, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 12, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 13, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 14, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 15, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 16, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 17, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 18, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 19, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 20, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 21, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
                { id: 22, keyword: 'สวัสดีค่ะ', intent: 'Greeting', story_name: 'แนะนำสินค้า', distance: 1 },
            ]
        }
    },
    created: function () {
    },
    beforeDestroy: function () {
    },
    methods: {
    },
})