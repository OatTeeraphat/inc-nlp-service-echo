// nlp records service
class NlpRecordsService {

    constructor( httpRepository, vueRouter, localStorageRepository, cookieRepository, vueErrorHandler) {
        this.vueRouter = vueRouter
        this.vueErrorHandler =vueErrorHandler
        this.httpRepository = httpRepository
        this.localStorageRepository = localStorageRepository
        this.cookieRepository = cookieRepository
        this.$infiniteHandler = new BehaviorSubject({ page: 1 })
        this.$searchNlpRecordByKeyword = new Subject()
        this.unsubscribe = new Subject()
    }

    getNlpRecordsPaginationByKeyword(keyword, page) {
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

    searchNlpRecordsPaginationByKeywordSubject() {
        
        return this.$searchNlpRecordByKeyword.pipe(
            takeUntil(this.unsubscribe),
            throttleTime(200),
            switchMap( ({keyword, page}) => this.getNlpRecordsPaginationByKeyword(keyword, page) )
        )
    }

    getNlpRecordsPagination(page) {
        return this.httpRepository.getNlpRecordsPagination(page).pipe(
            takeUntil(this.unsubscribe),
            map( ({ response }) => new GetNlpRecordsPagination().adapt(response) ),
        )
    }

    getNlpRecordsByInfiniteScrollSubject() {
        console.log(this.$infiniteHandler.getValue())
        return this.$infiniteHandler.pipe(
            takeUntil(this.unsubscribe),
            throttleTime(200),
            exhaustMap( ({ page }) =>  this.getNlpRecordsPagination(page) ),
            this.vueErrorHandler.catchError(),
        )
    }

    bulkDeleteNlpRecordsByIDs(ids) {
        
        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            takeUntil(this.unsubscribe),
            switchMap( SWAL_CONFIRM => {
                console.debug(SWAL_CONFIRM)

                if (SWAL_CONFIRM) return this.httpRepository.bulkDeleteNlpRecordsByIDs(ids)

                const SWAL_CANCEL = false

                return throwError(SWAL_CANCEL)
            }),
            map( next => {
                swal("resolve", {icon: "success", timer: this.duration}) 
            }),
            this.vueErrorHandler.catchError()
        )
    }

    deleteNlpRecordByID(id) {        
        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            takeUntil(this.unsubscribe),
            switchMap( yes => {
                const SWAL_CONFIRM = yes

                if (SWAL_CONFIRM) return this.httpRepository.deleteNlpRecordByID(id)

                return throwError("SWAL_CANCEL")
            }),
            map( it => {
                swal('resolve', {icon: "success", timer: this.duration}) 

                return of(it)
            }),
            this.vueErrorHandler.catchError()
        )
    }

    nextPageNlpRecordsByInfiniteScroll(page) {
        this.$infiniteHandler.next({
            page: page
        })
    }

    nextSearchNlpRecordByKeyword(keyword, page) {
        this.$searchNlpRecordByKeyword.next({
            keyword: keyword, 
            page: page
        })
    }

    getRecentlyNlpRecordHistory() {
        let domain =  this.localStorageRepository.getRecentlyNlpRecordSearch()
        return of(domain)
    }

    disposable() {
        this.unsubscribe.next(true)
        this.unsubscribe.complete()
    }
}