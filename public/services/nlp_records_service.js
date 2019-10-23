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
            switchMap( it => this.sweetAlertAjaxWrapper.readTransaction(this.getNlpRecordsPagination(it.page)) ),
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