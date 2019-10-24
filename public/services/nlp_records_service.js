class NlpRecordsService {

    constructor(
        httpRepository = new HttpRepository(),
        sweetAlertAjaxWrapper = new SweetAlertAjaxWrapper()
    ) {
        this.sweetAlertAjaxWrapper = sweetAlertAjaxWrapper
        this.httpRepository = httpRepository
        this.infiniteHandler$$ = new Subject()
        this.unsubscribe = new Subject()
    }

    getNlpRecordsPagination = (page) => {
        return this.httpRepository.getNlpRecordsPagination("keyword", "intent", "story", page).pipe(
            takeUntil(this.unsubscribe),
            map( json => new GetNlpRecordsPagination().adapt(json.response) ),
        )
    }

    getNlpRecordsByInfiniteScrollSubject = () => {
        return this.infiniteHandler$$.pipe(
            takeUntil(this.unsubscribe),
            debounceTime(600),
            concatMap( it => this.sweetAlertAjaxWrapper.readTransaction(this.getNlpRecordsPagination(it.page)) ),
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