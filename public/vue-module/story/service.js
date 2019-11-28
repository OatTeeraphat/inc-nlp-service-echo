import { GetStoryModelAdapter } from './dao.js'

export class StoryService {
    
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
        let confirmModal = swal2('warning', { text: "Are you sure ?", title: "Delete Story" }, true)
        return from( confirmModal ).pipe(
            switchMap( result => {

                if (result.value) {
                    return this.httpRepository.deleteStoryByID(storyID).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                }

                return throwError(false)
            }),
            map( next => {
                swal2('success', { text: "resolve", title: "Delete Story" })
            }),
            finalize(() =>  { console.log("complete") })
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}