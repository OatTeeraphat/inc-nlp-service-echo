
class StoryService {
    
    constructor(httpRepository,sweetAlertAjaxHelper ) {
        this.httpRepository = httpRepository
        this.sweetAlertAjaxHelper = sweetAlertAjaxHelper
        this.unsubscribe = new Subject()
    }
    
    getStoryState() {
        let getAllStoriesEvent$ = this.httpRepository.getAllStories()
        return this.sweetAlertAjaxHelper.readTransaction(getAllStoriesEvent$).pipe(
            takeUntil(this.unsubscribe),
            map( json => new GetStoryModelAdapter().adapt(json.response) )
        )
    }

    deleteStoryByID(storyID) {  
        let deleteStoryByIDEvent$ = this.httpRepository.deleteStoryByID(storyID)
        return this.sweetAlertAjaxHelper.confirmTransaction(deleteStoryByIDEvent$).pipe(
            takeUntil(this.unsubscribe),
            switchMap( it => {
                
                if (this.sweetAlertAjaxHelper.isSwalCancelEvent(it)) {
                    console.log("errors")
                    return throwError("cancel transaction")
                }

                return of(it)
            })
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}