
class StoryService {
    
    constructor( httpRepository, vueRouter, cookieRepository, vueErrorHandler) {
        this.vueRouter = vueRouter
        this.vueErrorHandler = vueErrorHandler
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.unsubscribe = new Subject()
    }

    getStoryState() {

        return this.httpRepository.getAllStories().pipe(
            takeUntil(this.unsubscribe),
            switchMap( ({ response }) => {
                return of(new GetStoryModelAdapter().adapt(response))
            }),
            this.vueErrorHandler.catchHttpError(),
        )
    }

    deleteStoryByID(storyID) {

        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            switchMap( yes => {

                if (yes) {
                    return this.httpRepository.deleteStoryByID(storyID).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                }

                return throwError("no")
            }),
            map( next => {
                swal("resolve", {icon: "success", timer: this.duration}) 
            }),
            finalize(() =>  { console.log("complete") })
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}