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
        this.$NlpRecordXLSXUploadSubject = new Subject()
        this.$uploadXLSXNlpRecordProgressBar = new Subject()
    }

    // #################################### NlpSearchByKeyword Pagination Service ####################################
    getNlpRecordsPaginationByKeyword(keyword, page) {
        return this.httpRepository.getNlpRecordsPaginationByKeyword(keyword, page).pipe(
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
            throttleTime(300),
            switchMap( ({keyword, page}) => this.getNlpRecordsPaginationByKeyword(keyword, page) )
        )
    }
    // #################################### NlpSearchByKeyword Pagination Service ####################################



    // ############################ NlpRecord InfiniteScroll Loading Service ############################
    getNlpRecordsPagination(page) {
        return this.httpRepository.getNlpRecordsPagination(page).pipe(
            map( ({ response }) => new GetNlpRecordsPagination().adapt(response) ),
        )
    }
    getNlpRecordsByInfiniteScrollSubject() {
        // console.log(this.$infiniteHandler.getValue())
        return this.$infiniteHandler.pipe(
            throttleTime(200),
            exhaustMap( ({ page }) =>  this.getNlpRecordsPagination(page) ),
            this.vueErrorHandler.catchError(),
        )
    }
    nextPageNlpRecordsByInfiniteScroll(page) {
        this.$infiniteHandler.next({
            page: page
        })
    }
    // ############################ NlpRecord InfiniteScroll Loading Service ############################ 


    bulkDeleteNlpRecordsByIDs(ids) { 
        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
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

    // ######################## NlpRecord XLSX UPLOADER ########################
    uploadXlSXNlpRecordSubject() {
        return this.$NlpRecordXLSXUploadSubject.pipe(
            switchMap( ({ formData }) => {
                return this.httpRepository.uploadXlSXNlpRecord(formData)
            }),
            this.vueErrorHandler.catchError()
        )
    }


    nextUploadXLSXNlpRecord(fileList) {
        console.debug(fileList)
        console.debug(`fileList.length: ${fileList.length}`)
        let newNlpXlsxUpload = new FormData()
        newNlpXlsxUpload.append('xlsx', fileList[0], fileList[0].name);
        return this.$NlpRecordXLSXUploadSubject.next({ 
            formData: newNlpXlsxUpload,
        })
    }
    // ######################## NlpRecord XLSX UPLOADER ########################


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
}