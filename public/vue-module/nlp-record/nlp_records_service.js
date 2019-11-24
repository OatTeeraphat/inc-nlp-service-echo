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

    getNlpRecordsPaginationByKeyword(keyword, page) {
        return this.httpRepository.getNlpRecordsPaginationByKeyword(keyword, page).pipe(
            map( ({ response }) => {

                if ( keyword !== "" ) {
                    this.localStorageRepository.setRecentlyNlpRecordSearch(keyword)
                }
                return new GetNlpRecordsPagination().adapt(response)
            }),
            this.vueErrorHandler.catchHttpError(),
        )
    }
    searchNlpRecordsPaginationByKeywordSubject() {
        return this.$searchNlpRecordByKeyword.pipe(
            throttleTime(300),
            switchMap( ({keyword, page}) => this.getNlpRecordsPaginationByKeyword(keyword, page) )
        )
    }


    getNlpRecordsPagination(page) {
        return this.httpRepository.getNlpRecordsPagination(page).pipe(
            map( ({ response }) => new GetNlpRecordsPagination().adapt(response) ),
            this.vueErrorHandler.catchHttpError(),
        )
    }
    getNlpRecordsByInfiniteScrollSubject() {
        // console.log(this.$infiniteHandler.getValue())
        return this.$infiniteHandler.pipe(
            throttleTime(200),
            exhaustMap( ({ page }) =>  this.getNlpRecordsPagination(page) ),
        )
    }
    nextPageNlpRecordsByInfiniteScroll(page) {
        this.$infiniteHandler.next({
            page: page
        })
    }


    bulkDeleteNlpRecordsByIDs(ids) { 
        let confirmModal = swal2('warning', { text: "Are you sure ?", title: "Delete NLP records" }, true)
        return from( confirmModal).pipe(
            switchMap( result => {
                console.debug(result.value)

                if (result.value) {
                    return this.httpRepository.bulkDeleteNlpRecordsByIDs(ids).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                }

                return throwError(false)
            }),
            map( next => {
                swal2('success', { text: "resolve", title: "Delete NLP records" })
            }),
        )
    }
    deleteNlpRecordByID(id) {     
        let confirmModal = swal2('warning', { text: "Are you sure ?", title: "Delete NLP records" }, true)
        return from( confirmModal ).pipe(
            switchMap( result => {

                if (result.value) {
                    return this.httpRepository.deleteNlpRecordByID(id).pipe(
                        this.vueErrorHandler.catchHttpError(),
                    )
                } 

                return throwError(false)
            }),
            map( it => {
                swal2('success', { text: "resolve", title: "Delete NLP record" })
                return of(it)
            })
        )
    }

    uploadXlSXNlpRecordSubject() {
        return this.$NlpRecordXLSXUploadSubject.pipe(
            switchMap( ({ formData }) => {
                return this.httpRepository.uploadXlSXNlpRecord(formData).pipe(
                    this.vueErrorHandler.catchHttpError(),
                )
            }),
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