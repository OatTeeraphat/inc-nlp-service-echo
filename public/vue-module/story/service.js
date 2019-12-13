import { GetStoryModelAdapter, GetPaginationNlpRecordByStoryIDs } from './dao.js'

export class StoryService {
    
    constructor( httpRepository, vueRouter, cookieRepository, vueErrorHandler) {
        this.vueRouter = vueRouter
        this.vueErrorHandler = vueErrorHandler
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.$$addStory = new Subject()
        this.$$setStoryByID = new Subject()
        this.$$getPaginationNlpRecordByStoryIDs = new Subject()
    }

    getStoryState() {

        return this.httpRepository.getAllStories().pipe(
            map( ({response}) => {
                return new GetStoryModelAdapter().adapt(response)
            }),
            this.vueErrorHandler.catchHttpError(),
        )
    }

    getNlpRecordByStoryIDs() {
        return this.$$getPaginationNlpRecordByStoryIDs.pipe(
            throttleTime(200),
            exhaustMap( ({ page, story_id }) => {
                return  this.httpRepository.getNlpRecordByStoryIDs(story_id, page).pipe(
                    map( ({response}) => {
                        return new GetPaginationNlpRecordByStoryIDs().adapt(response)
                    }),
                    this.vueErrorHandler.catchHttpError(),
                )
            })
        )
    }

    nextPage() {
        return this.$$getPaginationNlpRecordByStoryIDs.next({
            page: "1",
            story_id: ["00000000-0000-0000-0000-000000000000"]
        })
    }

    setStoryByID(storyID) {
        return this.$$setStoryByID.pipe(
            switchMap(() => {
                if (storyID) {
                    return this.httpRepository.updateStoryByID(storyID).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                }
                return of({})
            }),
        )
    }

    nextSetStoryByID(story, id){
        return this.$$setStoryByID.next(story)
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
}