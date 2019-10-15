var storyPresenter = Vue.component('story-presenter', {    
    template: `
        <div><h1>Story</h1><p>This is home page</p></div>
    `,
    data: function () {
        return {
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