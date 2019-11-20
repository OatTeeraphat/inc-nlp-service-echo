class NlpRecordPresenter {
    constructor(nlpRecordsService) {
        this.view = {
            isShowLoadingIndicator: false,

            page: 1,
            limit: 1,
            total: 1,
            nlpRecords: [],
            nlpRecordsCheckedList: { ids: [] },
            
            searchKeyword: "",
            searchPage: 1,
            searchLimit: 1,
            searchTotal: 1,
            nlpRecordsByKeyword: [],
            nlpRecordsByKeywordCheckedList: { ids: [] },

            searchRecently: {}
        }
        this.nlpRecordsService = nlpRecordsService
        this.searchNlpRecordsServiceSubscription = null
        this.getNlpRecordsByInfiniteScrollSubscription = null
    }

    getInitialState() {
        this.getNlpRecordsByInfiniteScrollSubscription = this.nlpRecordsService.getNlpRecordsByInfiniteScrollSubject().subscribe( item => {
            this.view.page = this.view.page + 1
            this.view.total = item.total
            this.view.limit = item.limit
            this.view.nlpRecords.push(...item.nlp_records)
            this.view.isShowLoadingIndicator = false
        }, 
        error => {
            console.error(error)
            this.view.isShowLoadingIndicator = false
        })
        this.searchNlpRecordsServiceSubscription = this.nlpRecordsService.searchNlpRecordsPaginationByKeywordSubject().subscribe( it => {
            this.view.nlpRecordsByKeyword.push(...it.nlp_records)
        })
    }

    getMoreNlpRecordByInfiniteScroll( event ) {
        // console.log(this.view.isShowLoadingIndicator)
        let {scrollTop, clientHeight, scrollHeight } = event.srcElement
        if (scrollTop + clientHeight >= scrollHeight / 1.2) {
            this.view.isShowLoadingIndicator = true
            this.nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(this.view.page)
        }
    }

    selectAllNlpRecord(event) {
        this.view.nlpRecordsCheckedList.ids = []
        this.view.nlpRecords.forEach( select => { this.view.nlpRecordsCheckedList.ids.push(select.id) })
    }

    deselectAllNlpRecord(event) {
        this.view.nlpRecordsCheckedList.ids = []
    }

    bulkDeleteNlpRecord(event) {
        // bulk delete
        this.nlpRecordsService.bulkDeleteNlpRecordsByIDs(this.view.nlpRecordsCheckedList.ids).subscribe( () => {
            this.view.nlpRecords = this.view.nlpRecords.filter( item => !this.view.nlpRecordsCheckedList.ids.includes(item.id) )

            console.log(this.view.nlpRecordsCheckedList)
            this.view.nlpRecordsCheckedList.ids = []

            // next page event
            if (this.view.nlpRecords.length == 0) {
                this.nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(this.view.page)
            }
        })
    }

    searchNlpRecordByKeywordComputed() {
        this.view.searchPage = 1
        this.view.nlpRecordsByKeyword = []
        this.view.nlpRecordsByKeywordCheckedList = { ids: [] }

        return this.view.searchKeyword
    }

    deleteNlpRecordByID(id) {
        this.nlpRecordsService.deleteNlpRecordByID(id).subscribe( () =>  {
            this.view.nlpRecords = this.view.nlpRecords.filter( item => item.id !== id) 
            this.view.nlpRecordsByKeyword = this.view.nlpRecordsByKeyword.filter( item => item.id !== id) 
        })
    }

    searchNlpRecordByKeyword(event)  {
        console.log(event.target.value)
        this.nlpRecordsService.nextSearchNlpRecordByKeyword(event.target.value, 1)
    }

    disposal() {

        this.searchNlpRecordsServiceSubscription.unsubscribe()
        this.getNlpRecordsByInfiniteScrollSubscription.unsubscribe()

        // set page index to 1
        this.view.page = 1
        this.nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(1)
        
        this.view.nlpRecords = []
        this.view.nlpRecordsCheckedList = { ids: [] }

        this.view.nlpRecordsByKeyword = []
        this.view.nlpRecordsByKeywordCheckedList = { ids: [] }
    }
}