class StoryViewModel {
    constructor() {
        this.currentStory = ""
        this.stories = [],
        this.storiesCheckList = {
            ids: []
        }
        this.trainingSetCheckList = {
            ids: []
        }
        this.trainingSet = [

        ],
        this.addRow = {
            toggleRow: false,
            toggleInput: false,
            highlight: false,
            inputDisabled: false,
            name: "",
            desc: ""
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
        this.$refs = {}
        this.view = new StoryViewModel()
        this.storyService = storyService
        this.$getNlpRecordByStoryIDsSubscription = null
    }

    onMounted(ref) {
        this.$refs = ref

        this.storyService.getStoryState().subscribe(it => { 
            if (it != []){
                this.view.currentStory = it[0]['id']
            }
            
            this.view.stories = it
        })

        this.storyService.insertStory().subscribe(it => {

            this.view.addRow.name = ""
            this.view.addRow.desc = ""
            console.log(this.view.stories)

            if (it !== null) {
                this.view.stories = [it, ...this.view.stories]
                this.view.addRow.highlight = true
            }

        })

        this.storyService.setStoryByID().subscribe()

        this.$getNlpRecordByStoryIDsSubscription = this.storyService.getNlpRecordByStoryIDs().subscribe( it => {
            
            this.view.trainingSet.push(...it.nlp_record)
        })

        this.storyService.nextPage()

    }

    selectAllStory() {
        this.view.storiesCheckList.ids = []
        this.view.stories.forEach( ({ id }) => { this.view.storiesCheckList.ids.push(id) })
    }

    insertStory() {

        let _addRow = this.view.addRow

        this.storyService.nextInsertStory({
            name: _addRow.name,
            desc: _addRow.desc,
        })

        this.view.addRow.highlight = false
        this.view.addRow.inputDisabled = true

    }

    selectAllTrainingSet() {
        this.view.trainingSetCheckList.ids = []
        this.view.stories.forEach(({ id }) => { this.view.trainingSetCheckList.ids.push(id) })
    }


    editStoryByID(id, index) {

        console.log('edit')
        let toggleDelay = of({}).pipe(delay(100))
        toggleDelay.subscribe(() => this.$refs.story[index].focus())

        let editValue = this.view.stories.filter(item => item.id == id)
        this.storyService.nextSetStoryByID({
            name: editValue.name,
            desc: editValue.desc
        }, id)
    }

    
    deleteStoryByID (id) {
        this.storyService.deleteStoryByID(id).subscribe( () =>  {
            this.view.stories = this.view.stories.filter( item => item.id !== id ) 
        })
    }



    beforeDestroy() {
        this.view = new StoryViewModel()
        this.$getNlpRecordByStoryIDsSubscription.unsubscribe()
    }
}