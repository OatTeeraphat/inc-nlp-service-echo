class StoryService {
    
    constructor(httpRepository = new HttpRepository()) {
        this.httpRepository = httpRepository
        this.unsubscribe = new Subject()
    }
    

    getStoryState() {
        return this.httpRepository.getAllStories().pipe(
            takeUntil(this.unsubscribe),
            map( json => new GetStoryModelAdapter().adapt(json.response) )
        )    
    }

    deleteStoryByID(storyID) {
        return sweetAlertAjaxWrapper(this.httpRepository.deleteStoryByID(storyID)).pipe(
            takeUntil(this.unsubscribe)
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}