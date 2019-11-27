class NlpTrainingLogViewModel {
    constructor(){
        this.isShowLoadingIndicator = false
        this.page = 1
        this.limit = 1
        this.total = 1
        this.nlpLogs = []
        this.nlpLogsCheckedList = { ids: [] }
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
        this.$nlpTrainingLogInfiniteScrollSubscription = this.nlpTrainingLogService.getNlpTrainingLogPaginationByInfiniteScrollSubject().subscribe( it => {
            this.view.page = it.page
            this.view.total = it.total
            this.view.limit = it.limit
            this.view.nlpLogs.push(...it.nlp_logs)
        })
        // get first page
        this.nlpTrainingLogService.nextNlpTrainingLogPaginationPage(this.view.page)
    }

    selectAllNlpTrainingLog() {
        this.view.nlpLogsCheckedList.ids = []
        this.view.nlpLogs.forEach( ({ id }) => { this.view.nlpLogsCheckedList.ids.push(id) })
    }

    deselectAllNlpTrainingLog() {
        this.view.nlpLogsCheckedList.ids =   []
    }

    bulkDeleteNlpTrainingLog() {
        this.nlpTrainingLogService.bulkDeleteNlpTrainingLogsByIDs(this.view.nlpLogsCheckedList.ids).subscribe( () => {

            this.view.nlpLogs = this.view.nlpLogs.filter( ({ id }) => !this.view.nlpLogsCheckedList.ids.includes(id) )
            this.view.nlpLogsCheckedList.ids = []
        })
    }

    deleteNlpTrainingLogByID(id) {
        console.log(id)
        this.nlpTrainingLogService.deleteNlpTrainingLogByID(id).subscribe( () =>  
            this.view.nlpLogs = this.view.nlpLogs.filter( item => item.id !== id) 
        )
    }

    beforeDestroy() {
        // this.nlpTrainingLogService.disposable()
        this.$nlpTrainingLogInfiniteScrollSubscription.unsubscribe()
        this.view = new NlpTrainingLogViewModel()
    }
    
}