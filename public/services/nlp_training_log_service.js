class NlpTrainingLogService {
    
    constructor(httpRepository, vueRouter, cookieRepository, vueErrorHandler) {
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.vueRouter = vueRouter
        this.vueErrorHandler = vueErrorHandler
        this.unsubscribe = new Subject()
        this.infiniteHandler$$ = new Subject()
    }

    getNlpTrainingLogPagination = (page) => {
        return this.httpRepository.getNlpTrainingLogPagination("keyword", "intent", "story", page).pipe(
            takeUntil(this.unsubscribe),
            map( ({ response }) => {
                return new GetNlpTrainingLogPaginationAdapter().adapt(response) 
            }),
        )
    }
    
    getNlpTrainingLogPaginationByInfiniteScrollSubject = () => {
        return this.infiniteHandler$$.pipe(
            takeUntil(this.unsubscribe),
            throttleTime(200),
            exhaustMap( ({ page }) => this.getNlpTrainingLogPagination(page) ),
            this.vueErrorHandler.catchError()
        )
    }

    bulkDeleteNlpTrainingLogsByIDs = (ids) => {
        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            takeUntil(this.unsubscribe),
            switchMap( SWAL_CONFIRM => {
                console.debug(SWAL_CONFIRM)

                if (SWAL_CONFIRM) return this.httpRepository.bulkDeleteNlpTrainingLogsByIDs(ids)

                const SWAL_CANCEL = false

                return throwError(SWAL_CANCEL)
            }),
            map( next => {
                swal("resolve", {icon: "success", timer: this.duration}) 
            }),
            this.vueErrorHandler.catchError()
        )
    }

    deleteNlpTrainingLogByID = (id) => {        

        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            takeUntil(this.unsubscribe),
            switchMap( yes => {
                const SWAL_CONFIRM = yes

                if (SWAL_CONFIRM) return this.httpRepository.deleteNlpTrainingLogByID(id)

                return throwError("SWAL_CANCEL")
            }),
            map( it => {
                swal('resolve', {icon: "success", timer: this.duration}) 

                return of(it)
            }),
            this.vueErrorHandler.catchError()
        )
    }

    nextNlpTrainingLogPaginationPage = (pageID) => {
        this.infiniteHandler$$.next({ page: pageID })
    }
    
    disposable = () => {
        // this.infiniteHandler$$.next()
        // this.infiniteHandler$$.complete()
        
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }

}