class NlpTrainingLogService {
    constructor(httpRepository, sweetAlertAjaxHelper) {
        this.httpRepository = httpRepository
        this.sweetAlertAjaxHelper = sweetAlertAjaxHelper
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
            debounceTime(200),
            exhaustMap( ({ page }) => 
                this.sweetAlertAjaxHelper.readTransaction( this.getNlpTrainingLogPagination(page) ) 
            ),
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