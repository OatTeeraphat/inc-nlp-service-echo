class StoryViewModel {
    constructor() {
        this.stories = []
        this.intents = [
            { id: 1, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
            { id: 2, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
            { id: 3, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
            { id: 4, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
            { id: 5, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
            { id: 6, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' },
            { id: 7, intent: 'Greeting', desc: 'ต้อนรับชาวโลก' }
        ]
    }
}

export class StoryPresenter {
    constructor(storyService) {
        this.view = new StoryViewModel()
        this.storyService = storyService
    }

    onMounted() {
        this.storyService.getStoryState().subscribe(it => { 
            this.view.stories.push(...it) 
        })
    }

    deleteStoryByID (id) {
        this.storyService.deleteStoryByID(id).subscribe( () =>  {
            this.view.stories = this.view.stories.filter( item => item.id !== id ) 
        })
    }

    beforeDestroy() {
        this.view = new StoryViewModel()
    }
}