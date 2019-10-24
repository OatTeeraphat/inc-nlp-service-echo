class NlpRecordsService {

    constructor(
        httpRepository = new HttpRepository(),
        sweetAlertAjaxWrapper = new SweetAlertAjaxWrapper()
    ) {
        this.sweetAlertAjaxWrapper = sweetAlertAjaxWrapper
        this.httpRepository = httpRepository
        this.infiniteHandler$$ = new BehaviorSubject({ page: 1 })
        this.unsubscribe = new Subject()
    }

    getNlpRecordsPagination = (page) => {
        return this.httpRepository.getNlpRecordsPagination("keyword", "intent", "story", page).pipe(
            takeUntil(this.unsubscribe),
            map( ({ response }) => new GetNlpRecordsPagination().adapt(response) ),
        )
    }

    getNlpRecordsByInfiniteScrollSubject = () => {
        return this.infiniteHandler$$.pipe(
            takeUntil(this.unsubscribe),
            debounceTime(200),
            concatMap( ({ page }) => this.sweetAlertAjaxWrapper.readTransaction(this.getNlpRecordsPagination(page)) ),
        )
    }

    bulkDeleteNlpRecordsByIDs = (ids) => {
        let bulkDeleteEvent$ = this.httpRepository.bulkDeleteNlpRecordsByIDs(ids)
        return this.sweetAlertAjaxWrapper.confirmTransaction(bulkDeleteEvent$).pipe(
            takeUntil(this.unsubscribe),
            map( json => json)
        )
    }

    nextPageNlpRecordsByInfiniteScroll = (page) => {
        this.infiniteHandler$$.next({page: page})
    }

    disposable = () => {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}