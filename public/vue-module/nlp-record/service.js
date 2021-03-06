import { 
    GetNlpRecordsPagination, 
    GetSearchByKeywordAndDistancePagination, 
    GetStoryModelAdapter, 
    GetNlpRecordInsertModelAdapter 
} from './dao.js'

// nlp records service
export class NlpRecordsService {

    constructor( httpRepository, vueRouter, localStorageRepository, cookieRepository, vueErrorHandler ) {
        this.vueRouter = vueRouter
        this.vueErrorHandler = vueErrorHandler
        this.httpRepository = httpRepository
        this.localStorageRepository = localStorageRepository
        this.cookieRepository = cookieRepository
        this.$infiniteHandler = new BehaviorSubject({ page: 1 })
        this.$searchNlpRecordByKeyword = new Subject()
        this.$NlpRecordXLSXUploadSubject = new Subject()
        this.$uploadXLSXNlpRecordProgressBar = new Subject()
        this.$updateNlpRecordRow = new Subject()
        this.$searchStories = new Subject()
        this.$insertNlpRecord = new Subject()
    }

    updateNlpRecordRowSubject() {
        return this.$updateNlpRecordRow.pipe(
            // map( ({id, keyword, intent , story_name}) => console.log(id, keyword, intent , story_name) ),
            debounceTime(500),
            switchMap( ({id, keyword, intent , story_name}) =>  {
                return this.httpRepository.putNlpRecord(id, keyword, intent , story_name).pipe(
                    map( () => {

                        swal2( ALERT.TOAST , { title: 'Reslove', icon : 'success' })

                        return {
                            id: id, 
                            keyword: keyword, 
                            intent: intent , 
                            story_name: story_name
                        }
                    }),
                    this.vueErrorHandler.catchHttpError()
                )
            })
        )
    }

    getNlpRecordsPaginationByKeyword(keyword, page) {
        return this.httpRepository.getNlpRecordsPaginationByKeyword(keyword, page).pipe(
            map( ({ response }) => {
                console.log(response)
                if ( keyword !== "" ) {
                    this.localStorageRepository.setRecentlyNlpRecordSearch(keyword)
                }
                return new GetSearchByKeywordAndDistancePagination(response).sortDistance(keyword)
            }),
            this.vueErrorHandler.catchHttpError(),
        )
    }

    searchNlpRecordsPaginationByKeywordSubject() {
        return this.$searchNlpRecordByKeyword.pipe( 
            debounceTime(150),
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

    insertNlpRecords(){
        return this.$insertNlpRecord.pipe(
            debounceTime(100),
            switchMap( nlpRecord => {

                nlpRecord = new GetNlpRecordInsertModelAdapter().adapt(nlpRecord)
                
                let condition = nlpRecord.keyword !== "" && nlpRecord.intent !== ""

                if (condition){
                    return this.httpRepository.insertNlpRecords(nlpRecord).pipe(
                        map( ({ response }) => {
                            return {
                                "id": response.id,
                                "intent": response.intent,
                                "keyword": response.keyword,
                                "story_name": response.story_name,
                                "updated_at": response.updated_at
                            } 
                        }),
                        map(next => {
                            swal2(ALERT.TOAST, { title: 'Insert Success', icon: 'success' })
                            return next
                        }),
                        this.vueErrorHandler.catchHttpError()
                    )
                }

                swal2(ALERT.TOAST, { title: 'Invalid Field', icon: 'error'})
                return of(null)

            })

        )
    }

    nextInsertNlpRecords(nlpRecord){
        return this.$insertNlpRecord.next(nlpRecord)
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
        let confirmModal = swal2(ALERT.DANGER, { text: "Are you sure ?", title: "Delete NLP records" }, true)
        return from( confirmModal ).pipe(
            delay(500),
            switchMap( result => {

                if (result.value) {
                    return this.httpRepository.deleteNlpRecordByID(id).pipe(
                        map( () => {
                            swal2(ALERT.TOAST, { title: 'Delete NLP record', icon: 'success' })
                            return true
                        })
                    )
                }
                
                return of(false)

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

    nextUpdateNlpRecordRow(item) {
        return this.$updateNlpRecordRow.next(item)
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

    getAllStories() {
        return this.httpRepository.getAllStories().pipe(
            map( response  => {
                return new GetStoryModelAdapter().adapt(response)
            }),
            this.vueErrorHandler.catchHttpError()
        )
    }

    getSearchStories() {
        return this.$searchStories.pipe(
            switchMap(({ search, allStory }) => {
                return allStory
            })
        )
    }

    nextSearchStories(search, allStory){
        return this.searchStories.next({
            search : search,
            allStory: allStory
        })
    }




}