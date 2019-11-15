// nlp records service
class NlpRecordsService {

    constructor( httpRepository, vueRouter, localStorageRepository, cookieRepository ) {
        this.vueRouter = vueRouter
        this.httpRepository = httpRepository
        this.localStorageRepository = localStorageRepository
        this.cookieRepository = cookieRepository
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
            exhaustMap( ({ page }) =>  this.getNlpRecordsPagination(page) ),
            vueCatchError(this.cookieRepository, this.vueRouter),
        )
    }

    bulkDeleteNlpRecordsByIDs = (ids) => {
        
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
            vueCatchError(this.cookieRepository, this.vueRouter)
        )
    }

    deleteNlpRecordByID = (id) => {        

        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            takeUntil(this.unsubscribe),
            switchMap( yes => {
                const SWAL_CONFIRM = yes

                if (SWAL_CONFIRM) return this.httpRepository.bulkDeleteNlpRecordsByIDs(id)

                return throwError("SWAL_CANCEL")
            }),
            map( it => {
                swal('resolve', {icon: "success", timer: this.duration}) 

                return of(it) 
            }),
            vueCatchError(this.cookieRepository, this.vueRouter)
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