var nlpLogPresenter = Vue.component('nlp-log-presenter', {    
    template: `
    <div class="row">
        <div class="table-responsive">
            <table class="table table-fixed">
                <thead>
                    <tr>
                        <th class="col-1" scope="col">#</th>
                        <th class="col-4" scope="col">keyword</th>
                        <th class="col-4" scope="col">intent</th>
                        <th class="col-2" scope="col">story</th>
                        <th class="col-1" scope="col">distance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in nlp_training_logs">
                        <th class="col-1" scope="row">{{ item.id }}</th>
                        <td class="col-4">{{ item.keyword }}</td>
                        <td class="col-4">{{ item.intent }}</td>
                        <td class="col-2">{{ item.story_name }}</td>
                        <td class="col-1">{{ item.distance }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data: function () {
        return {
            nlp_training_logs: [
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