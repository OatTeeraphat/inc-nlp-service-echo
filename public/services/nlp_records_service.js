// nlp records service
class NlpRecordsService {

    constructor(httpRepository, sweetAlertAjaxHelper, localStorageRepository ) {
        this.sweetAlertAjaxHelper = sweetAlertAjaxHelper
        this.httpRepository = httpRepository
        this.localStorageRepository = localStorageRepository
        this.infiniteHandler$$ = new Subject()
        this.unsubscribe = new Subject()
    }

    getNlpRecordsPaginationByKeyword = (keyword, page) => {
        return this.httpRepository.getNlpRecordsPaginationByKeyword(keyword, page).pipe(
            takeUntil(this.unsubscribe),
            map( ({ response }) => {

                if ( keyword !== "" ) {
                    this.localStorageRepository.setRecentlyNlpRecordSearch(keyword)
                }

                return new GetNlpRecordsPagination().adapt(response)

            }),
        )
    }

    getNlpRecordsPagination = (page) => {
        return this.httpRepository.getNlpRecordsPagination(page).pipe(
            takeUntil(this.unsubscribe),
            map( ({ response }) => new GetNlpRecordsPagination().adapt(response) ),
        )
    }

    getNlpRecordsByInfiniteScrollSubject = () => {
        return this.infiniteHandler$$.pipe(
            takeUntil(this.unsubscribe),
            throttleTime(200),
            exhaustMap( ({ page }) => 
                this.sweetAlertAjaxHelper.readTransaction( this.getNlpRecordsPagination(page) ) 
            ),
        )
    }

    bulkDeleteNlpRecordsByIDs = (ids) => {
        let bulkDeleteEvent$ = this.httpRepository.bulkDeleteNlpRecordsByIDs(ids)
        return this.sweetAlertAjaxHelper.confirmTransaction(bulkDeleteEvent$).pipe(
            takeUntil(this.unsubscribe),
            switchMap( it => {
                
                if (this.sweetAlertAjaxHelper.isSwalCancelEvent(it)) {
                    console.log("errors")
                    return throwError("cancel transaction")
                }
                return of(it)
            })
        )
    }

    deleteNlpRecordByID = (id) => {
        let deleteNlpRecordEvent$ = this.httpRepository.deleteNlpRecordByID(id)
        return this.sweetAlertAjaxHelper.confirmTransaction(deleteNlpRecordEvent$).pipe(
            takeUntil(this.unsubscribe),
            switchMap( it => {
                if (this.sweetAlertAjaxHelper.isSwalCancelEvent(it)) {
                    console.log("errors")
                    return throwError("cancel transaction")
                }

                return of(it)
            })
        )
    }

    nextPageNlpRecordsByInfiniteScroll = (page) => {
        this.infiniteHandler$$.next({page: page})
    }

    getRecentlyNlpRecordHistory = () => {
        let domain =  this.localStorageRepository.getRecentlyNlpRecordSearch()
        return of(domain)
    }

    disposable = () => {
        this.unsubscribe.next(true)
        this.unsubscribe.complete()
    }
}