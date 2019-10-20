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
                    <th @click="removeStoryByID(item.id)" scope="row" >{{ item.id }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.desc }}</td>
                    <td>{{ item.owner }}</td>
                </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            stories: []
        }
    },
    created: function () {
        this.storyService = new StoryService()
        this.storyService.getStoryState()
        .pipe(
            tap( it => { console.debug(it) } )
        )
        .subscribe(
            it => { this.stories.push(...it) }
        )
    },
    beforeDestroy: function () {
        this.storyService.disposable()
        console.debug("disposable")
    },
    methods: {
        removeStoryByID: function(id) {
            this.storyService.deleteStoryByID(id)
            .pipe(
                tap( it => { console.debug(it) } )
            )
            .subscribe(
                it => {
                    console.debug(it)
                    this.stories = this.stories.filter( item => item.id !== id )
                },
                e => { console.debug(e) },
                () => { console.debug("complete") }
            )
        }
    },
})