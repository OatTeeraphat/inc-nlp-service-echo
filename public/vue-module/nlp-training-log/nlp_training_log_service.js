import { GetNlpTrainingLogPaginationAdapter } from './get_nlp_training_log_pagination_adapter.js'

export class NlpTrainingLogService {
    
    constructor(httpRepository, vueRouter, cookieRepository, vueErrorHandler) {
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.vueRouter = vueRouter
        this.vueErrorHandler = vueErrorHandler
        this.infiniteHandler$$ = new Subject()
    }

    getNlpTrainingLogPagination = (page, keyword) => {
        return this.httpRepository.getNlpTrainingLogPagination(keyword, "intent", "story", page).pipe(
            map( ({ response }) => {
                return new GetNlpTrainingLogPaginationAdapter().adapt(response) 
            }),
            this.vueErrorHandler.catchHttpError(),
        )
    }
    
    getNlpTrainingLogPaginationByInfiniteScrollSubject = () => {
        return this.infiniteHandler$$.pipe(
            throttleTime(200),
            exhaustMap( ({ page, keyword }) => this.getNlpTrainingLogPagination(page, keyword) ),
        )
    }

    bulkDeleteNlpTrainingLogsByIDs = (ids) => {
        let confirmModal = swal2('warning', { text: "Are you sure ?", title: "Delete NLP training record" }, true)
        return from( confirmModal ).pipe(
            switchMap( result => {
                console.debug(result)

                if (result.value) {
                    return this.httpRepository.bulkDeleteNlpTrainingLogsByIDs(ids).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                } 

                return throwError(false)
            }),
            map( next => {
                swal2('success', { text: "resolve", title: "Delete NLP training log" })
                return next
            }),
        )
    }

    deleteNlpTrainingLogByID = (id) => {        
        let confirmModal = swal2('warning', { text: "Are you sure ?", title: "Delete NLP training record" }, true)
        return from( confirmModal ).pipe(
            switchMap( result => {
                console.debug(result)
                if (result.value) {
                    return this.httpRepository.deleteNlpTrainingLogByID(id).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                }
                return throwError(false)
            }),
            map( it => {
                swal2('success', { text: "resolve", title: "Delete NLP training log" })
                return it
            }),
        )
    }

    nextNlpTrainingLogPaginationPage = (page, keyword) => {
        this.infiniteHandler$$.next({ page: page, keyword: keyword })
    }

}