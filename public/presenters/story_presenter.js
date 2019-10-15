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
        this.subscription0 = this.storyService.getStoryStateSubscription(this.stories)
        this.subscription1 = this.storyService.deleteStoryByIDSubscription(this.stories)
    },
    beforeDestroy: function () {
        this.subscription0.unsubscribe()
        this.subscription1.unsubscribe()
    },
    methods: {
        removeStoryByID: function(id) {
            this.storyService.deleteNextStoryID(id)
        }
    },
})