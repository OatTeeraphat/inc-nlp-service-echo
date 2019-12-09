class NlpTrainingLogViewModel {
    constructor(){
        this.isShowLoadingIndicator = false
        this.page = 1
        this.limit = 1
        this.total = 1
        this.nlpLogs = []
        this.nlpLogsCheckedList = { ids: [] }
        this.searchKeyword = ""
        this.searchPage = 1
        this.searchLimit = 1
        this.searchTotal = 1
        this.nlpRecordsByKeyword = []
        this.nlpRecordsByKeywordCheckedList = { ids: [] }
    }
}

export class NlpTrainingLogPresenter {
    constructor(nlpTrainingLogService) {
        this.view = new NlpTrainingLogViewModel()
        this.nlpTrainingLogService = nlpTrainingLogService
        
        this.$nlpTrainingLogInfiniteScrollSubscription = null
    }

    // getInitialInstance
    onMounted(){
        this.$nlpTrainingLogInfiniteScrollSubscription = this.nlpTrainingLogService.getPaginationByInfiniteScrollSubject().subscribe( it => {
            this.view.page = it.page
            this.view.total = it.total
            this.view.limit = it.limit
            this.view.nlpLogs.push(...it.nlp_logs)
        })
        // get first page
        this.nlpTrainingLogService.nextPaginationPage(this.view.page, this.view.searchKeyword)
    }

    // getByInfiniteScroll( event ) {
    //     let {scrollTop, clientHeight, scrollHeight } = event.srcElement
    //     if (scrollTop + clientHeight >= scrollHeight / 1.2) {
    //         this.view.isShowLoadingIndicator = true
    //         this.nlpRecordsService.nextPageByInfiniteScroll(this.view.page)
    //     }
    // }

    selectAll() {
        this.view.nlpLogsCheckedList.ids = []
        this.view.nlpLogs.forEach( ({ id }) => { this.view.nlpLogsCheckedList.ids.push(id) })
    }

    deselectAll() {
        this.view.nlpLogsCheckedList.ids =   []
    }

    bulkDelete() {
        this.nlpTrainingLogService.bulkDeleteByIDs(this.view.nlpLogsCheckedList.ids).subscribe( () => {

            this.view.nlpLogs = this.view.nlpLogs.filter( ({ id }) => !this.view.nlpLogsCheckedList.ids.includes(id) )
            this.view.nlpLogsCheckedList.ids = []

            if (this.view.nlpLogs.length == 0) {
                this.view.page = 1
                this.nlpTrainingLogService.nextPaginationPage(this.view.page, this.view.searchKeyword)
            }
        })
    }

    deleteByID(id) {
        console.log(id)
        this.nlpTrainingLogService.deleteByID(id).subscribe( () =>  
            this.view.nlpLogs = this.view.nlpLogs.filter( item => item.id !== id) 
        )
    }

    trainByID(id) {
        this.nlpTrainingLogService.trainByID(id).subscribe( () => {
            this.view.nlpLogs = this.view.nlpLogs.filter( item => item.id !== id)
        })
    }

    beforeDestroy() {
        // this.nlpTrainingLogService.disposable()
        this.$nlpTrainingLogInfiniteScrollSubscription.unsubscribe()
        this.view = new NlpTrainingLogViewModel()
    }
    
}