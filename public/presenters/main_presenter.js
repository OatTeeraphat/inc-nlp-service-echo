



var mainPresenter = Vue.component('main-presenter', {    
    template: `
    <div>
        <h1>Home</h1>
        <p>This is home page</p>
        <div @click="removeStoryByID(1)" >hello</div>
    </div>
    `,
    data: function () {
        return {
        }
    },
    created: function () {
        
    },
    beforeDestroy: function () {
    },
    methods: {
        removeStoryByID: function(id) {
            httpRepository = new HttpRepository()

            sweetAlertAjaxWrapper(httpRepository.deleteStoryByID(5)).subscribe(
                it => { console.log(it) },
                e => { console.log(e) },
                () => { console.log("complete ja") }
            )
            
        }
    },
})