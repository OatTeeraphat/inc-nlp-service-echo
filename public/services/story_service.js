class StoryService {
    
    constructor(httpRepository = new HttpRepository(), sweetAlertAjaxWrapper = new SweetAlertAjaxWrapper()) {
        this.httpRepository = httpRepository
        this.sweetAlertAjaxWrapper = sweetAlertAjaxWrapper
        this.unsubscribe = new Subject()
    }
    

    getStoryState() {
        let event$ = this.httpRepository.getAllStories()
        return this.sweetAlertAjaxWrapper.readTransaction(event$).pipe(
            takeUntil(this.unsubscribe),
            map( json => new GetStoryModelAdapter().adapt(json.response) )
        )
        
    }

    deleteStoryByID(storyID) {
        let event$ = this.httpRepository.deleteStoryByID(storyID)
        return this.sweetAlertAjaxWrapper.confirmTransaction(event$).pipe(
            takeUntil(this.unsubscribe)
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}