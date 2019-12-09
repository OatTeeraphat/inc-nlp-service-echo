class StoryViewModel {
    constructor() {
        this.currentStory = ""
        this.stories = []
        this.storiesCheckList = {
            ids: []
        }
        this.trainingSet = [
            { id: 1, keyword: 'ยินดีต้อนรับ', intent: 'ต้อนรับชาวโลก', story: 'Greeting' },
            { id: 2, keyword: 'ยินดีต้อนรับ', intent: 'ต้อนรับชาวโลก', story: 'Greeting' },
            { id: 3, keyword: 'ยินดีต้อนรับ', intent: 'ต้อนรับชาวโลก', story: 'Greeting' },
            { id: 4, keyword: 'ยินดีต้อนรับ', intent: 'ต้อนรับชาวโลก', story: 'Greeting' },
            { id: 5, keyword: 'ยินดีต้อนรับ', intent: 'ต้อนรับชาวโลก', story: 'Greeting' },
            { id: 6, keyword: 'ยินดีต้อนรับ', intent: 'ต้อนรับชาวโลก', story: 'Greeting' },
            { id: 7, keyword: 'ยินดีต้อนรับ', intent: 'ต้อนรับชาวโลก', story: 'Greeting' }
        ],
        this.addRow = {
            toggleRow: false,
            toggleStory: false,
            highlight: false,
            inputDisabled: false,
            keyword: "",
            intent: "",
            story: "",
            search_story: "",
            listStory: "",
        }
        this.addRow2 = {
            toggleRow: false,
            toggleStory: false,
            highlight: false,
            inputDisabled: false,
            keyword: "",
            intent: "",
            story: "",
            search_story: "",
            listStory: "",
        }
    }
}

export class StoryPresenter {
    constructor(storyService) {
        this.view = new StoryViewModel()
        this.storyService = storyService
    }

    onMounted() {
        this.storyService.getStoryState().subscribe(it => { 
            console.log('it ', it)
            if (it != []){
                this.view.currentStory = it[0]['id']
            }
            
            this.view.stories = it
        })
    }

    selectAllStory() {
        this.view.storiesCheckList.ids = []
        this.view.stories.forEach( ({ id }) => { this.view.storiesCheckList.ids.push(id) })
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