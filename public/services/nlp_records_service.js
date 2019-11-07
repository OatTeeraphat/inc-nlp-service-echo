// nlp records service
class NlpRecordsService {

    constructor(httpRepository,sweetAlertAjaxHelper ) {
        this.sweetAlertAjaxHelper = sweetAlertAjaxHelper
        this.httpRepository = httpRepository
        this.infiniteHandler$$ = new Subject()
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

    disposable = () => {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}