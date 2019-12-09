import { GetNlpTrainingLogPaginationAdapter } from './dao.js'

export class NlpTrainingLogService {
    
    constructor(httpRepository, vueRouter, cookieRepository, vueErrorHandler) {
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.vueRouter = vueRouter
        this.vueErrorHandler = vueErrorHandler
        this.infiniteHandler$$ = new Subject()
    }

    getPagination = (page, keyword) => {
        return this.httpRepository.getNlpTrainingLogPagination(keyword, "intent", "story", page).pipe(
            map( ({ response }) => {
                return new GetNlpTrainingLogPaginationAdapter().adapt(response) 
            }),
            this.vueErrorHandler.catchHttpError(),
        )
    }
    
    getPaginationByInfiniteScrollSubject = () => {
        return this.infiniteHandler$$.pipe(
            throttleTime(200),
            exhaustMap( ({ page, keyword }) => this.getPagination(page, keyword) ),
        )
    }

    bulkDeleteByIDs = (ids) => {
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

    deleteByID = (id) => {        
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

    trainByID = (id) => {
        let confirmModal = swal2('warning', { text: "Are you sure ?", title: "Train NLP" }, true)
        return from( confirmModal ).pipe(
            switchMap( result => {
                console.debug(result)
                if (result.value) {
                    return this.httpRepository.trainNlpTrainingLogByID(id).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                }
                return throwError(false)
            }),
            map( it => {
                swal2('success', { text: "resolve", title: "Train NLP" })
                return it
            }),
        )
    }

    nextPaginationPage = (page, keyword) => {
        this.infiniteHandler$$.next({ page: page, keyword: keyword })
    }

}