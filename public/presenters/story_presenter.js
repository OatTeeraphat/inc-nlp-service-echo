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
        this.storyService.getStoryState().subscribe(it => { 
            this.stories.push(...it) 
        })
    },
    
    methods: {
        removeStoryByID: function(id) {
            this.storyService.deleteStoryByID(id).subscribe( alertEvent => {
                if ( !alertEvent.cancel ) {
                    return this.stories = this.stories.filter( item => item.id !== id )
                }
            })
        }
    },
    beforeDestroy: function () {
        this.storyService.disposable()
    },
})