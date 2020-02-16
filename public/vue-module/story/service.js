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
                    map(({ response }) => {
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
                        swal2(ALERT.TOAST, { title: 'Insert Success', icon: 'success' }),
                        this.vueErrorHandler.catchHttpError(),
                    )
                }
                swal2(ALERT.TOAST, { title: 'Invalid Field', icon: 'error' })
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

    insertStory() {

        return this.$$addStory.pipe(

            switchMap( story => {

                let condition = story.name !== ""

                if(condition) { 
                    return this.httpRepository.insertStory(story).pipe(
                        map (response => {
                            
                            return {
                                "name": response.name,
                                "desc": response.desc,
                                "count_intent": "0",
                                "owner": "632861333807100",
                                "updated_at" : "2019-11-01 00:00:00.00+00"
                            }

                        }),
                        map(next => {
                            swal2(ALERT.TOAST, { title: 'Insert Success', icon: 'success' })
                            return next
                        }),
                        this.vueErrorHandler.catchHttpError()
                    )

                }

                swal2(ALERT.TOAST, { title: 'Invalid Field', icon: 'error' })
                return of(null)

            })
        )
    }

    nextInsertStory(story) {
        return this.$$addStory.next(story)
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}