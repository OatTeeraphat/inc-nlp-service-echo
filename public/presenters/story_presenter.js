var storyPresenter = Vue.component('story-presenter', {    
    template: `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Owner</th>
                </tr>
            </thead>
            <tbody v-for="item in stories">
                <tr>
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.desc }}</td>
                    <td>{{ item.owner }}</td>
                </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            stories: [
                { id: '1', name: 'แนะสินค้า', desc: 'แนะนำ สินค้าที่มีอยู่ในคลังสินค้า', owner: 'staff' },
                { id: '2', name: 'จัดส่ง', desc: 'จัดส่ง kerry, EMS', owner: 'staff' },
                { id: '3', name: 'คุยเล่น', desc: 'greeting, คุยเล่น ตาม สไตล์แม่ค้า', owner: 'staff' },
                { id: '4', name: 'เรียกพนักงาน', desc: 'บอทตอบไม่ไหว', owner: 'staff' },
                { id: '5', name: 'ใส่ตะกร้า', desc: 'เก็บของใส่ตะกร้า', owner: 'staff' },
                { id: '6', name: 'ดูรายการในตะกร้า', desc: 'ดูรายการในตะกร้า', owner: 'staff' },
            ]
        }
    },
    created: function () {
        this.storyService = new StoryService()
        this.storyService.getMockShop().subscribe(
            it => { console.log(it) },
            e => { console.log(e) }
        )
    },
    beforeDestroy: function () {
    },
    methods: {
    },
})