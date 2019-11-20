class StoryPresenter {
    constructor(storyService) {
        this.view = {
            stories: [],
            intents: [
                { id: 1, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 2, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 3, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 4, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 5, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 6, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
                { id: 7, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' }
            ]
        }
        this.storyService = storyService
    }

    getInitialState() {
        return this.storyService.getStoryState().subscribe(it => { 
            this.view.stories.push(...it) 
        })
    }

    deleteStoryByID (id) {
        return this.storyService.deleteStoryByID(id).subscribe( () =>  {
            this.view.stories = this.view.stories.filter( item => item.id !== id ) 
        })
    }

    disposal() {
        this.storyService.disposable()
    }
}