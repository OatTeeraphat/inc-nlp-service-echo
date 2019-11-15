
class StoryService {
    
    constructor( httpRepository, vueRouter, cookieRepository) {
        this.vueRouter = vueRouter
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
            vueCatchError(this.cookieRepository, this.vueRouter),
        )

    }

    deleteStoryByID(storyID) {

        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            switchMap( SWAL_CONFIRM => {
                console.debug(SWAL_CONFIRM)

                if (SWAL_CONFIRM) return this.httpRepository.deleteStoryByID(storyID)

                const SWAL_CANCEL = false

                return throwError("SWAL_CANCEL")
            }),
            map( next => {
                swal("resolve", {icon: "success", timer: this.duration}) 
            }),
            vueCatchError(this.cookieRepository, this.vueRouter),
            finalize(() =>  { console.log("complete") })
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}