class StoryService {
    
    constructor(
        httpRepository = new HttpRepository(),
        sweetAlertAjaxWrapper = new SweetAlertAjaxWrapper()
    ){
        this.httpRepository = httpRepository
        this.sweetAlertAjaxWrapper = sweetAlertAjaxWrapper
        this.unsubscribe = new Subject()
    }
    
    getStoryState() {
        let getAllStoriesEvent$ = this.httpRepository.getAllStories()
        return this.sweetAlertAjaxWrapper.readTransaction(getAllStoriesEvent$).pipe(
            takeUntil(this.unsubscribe),
            map( json => new GetStoryModelAdapter().adapt(json.response) )
        )
    }

    deleteStoryByID(storyID) {  
        let deleteStoryByIDEvent$ = this.httpRepository.deleteStoryByID(storyID)
        return this.sweetAlertAjaxWrapper.confirmTransaction(deleteStoryByIDEvent$).pipe(
            takeUntil(this.unsubscribe)
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}