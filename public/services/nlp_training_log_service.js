class NlpTrainingLogService {
    constructor(httpRepository, vueRouter, cookieRepository) {
        this.httpRepository = httpRepository
        this.vueRouter = vueRouter
        this.cookieRepository = cookieRepository
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
            vueCatchError(this.cookieRepository, this.vueRouter),
        )
    }

    nextNlpTrainingLogPaginationPage = (pageID) => {
        this.infiniteHandler$$.next({ page: pageID })
    }
    

    disposable = () => {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }

}