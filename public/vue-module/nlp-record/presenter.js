class NlpRecordViewModel {
    constructor(){
        // default value
        this.isShowLoadingIndicator = false
        this.page = 1
        this.limit = 1
        this.total = 1
        this.nlpRecords = []
        this.nlpRecordsCheckedList = { ids: [] }
        this.searchKeyword = ""
        this.searchPage = 1
        this.searchLimit = 1
        this.searchTotal = 1
        this.nlpRecordsByKeyword = []
        this.nlpRecordsByKeywordCheckedList = { ids: [] }
        this.searchRecently = {}
        this.uploadXlSXPercentage = 0
        this.allStory = []
        this.addRow = {
            toggleRow : false,
            toggleStory: false,
            highlight : false,
            inputDisabled: false,
            keyword : "",
            intent : "",
            story: "",
            search_story : "",
            listStory : "",
        }
    }
}

export class NlpRecordPresenter {
    constructor(nlpRecordsService) {
        this.$refs = {}
        this.view = new NlpRecordViewModel()
        this.nlpRecordsService = nlpRecordsService
        this.$searchNlpRecordsServiceSubscription = null
        this.$getNlpRecordsByInfiniteScrollSubscription = null
        this.$uploadXlSXNlpRecordUnSubscription = null
        this.$updateNlpRecordRowSubscription = null
    }

    onToggleAddRows() {
        // this.view.addRow.toggleRow = this.view.addRow.toggleRow;
        this.view.addRow = new NlpRecordViewModel().addRow
    }

    onMounted($refs) {
        this.$refs = $refs
        this.$getNlpRecordsByInfiniteScrollSubscription = this.nlpRecordsService.getNlpRecordsByInfiniteScrollSubject().subscribe( 
            item => {
                this.view.page = this.view.page + 1
                this.view.total = item.total
                this.view.limit = item.limit
                this.view.nlpRecords.push(...item.nlp_records)
                this.view.isShowLoadingIndicator = false
            }, 
            error => {
                console.error(error)
                this.view.isShowLoadingIndicator = false
            }
        )

        this.$searchNlpRecordsServiceSubscription = this.nlpRecordsService.searchNlpRecordsPaginationByKeywordSubject().subscribe( 
            it => {
                this.view.nlpRecordsByKeyword.push(...it.nlp_records)
            }
        )

        this.$uploadXlSXNlpRecordUnSubscription = this.nlpRecordsService.uploadXlSXNlpRecordSubject().subscribe( 
            it => {
                console.log("upload percentage, ", it )
            }
        )

        this.$updateNlpRecordRowSubscription = this.nlpRecordsService.updateNlpRecordRowSubject().subscribe( 
            it => {
                console.log(it)
                // let index = this.view.nlpRecords.findIndex(item => item.id === it.id);
            }
        )
        this.nlpRecordsService.getAllStories().subscribe(
            it => {
                this.view.allStory = it
                this.view.addRow.listStory = this.view.allStory
            }
        )
        this.nlpRecordsService.insertNlpRecords().subscribe(
            it => {
                console.log("########", it)
                this.view.addRow.keyword = ""
                this.view.addRow.intent = ""
                this.view.addRow.story = ""

                this.view.addRow.inputDisabled = false
                this.toggleStory = false

                if (it !== "ERROR") {
                    this.view.nlpRecords = [it, ...this.view.nlpRecords]
                    this.view.addRow.highlight = true
                }

                of(null).pipe(delay(1)).subscribe(() => this.$refs.keyword.focus())
            }
        )
        this.view.addRow.inputDisabled = false
        this.nlpRecordsService.getSearchStories().subscribe()
    }

    searchStoryAddRow() {
        let search = this.view.addRow.search_story
        let allStory = this.view.addRow.allStory
        this.nextSearchStories(search, allStory)
    }

    getMoreNlpRecordByInfiniteScroll( event ) {
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
                this.view.page = 1
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

    uploadXlSXNlpRecord(fieldName, fileList) {
        this.nlpRecordsService.nextUploadXLSXNlpRecord(fileList)
    }

    insertNlpRecordsRow() {

        let _addRow = this.view.addRow

        this.nlpRecordsService.nextInsertNlpRecords({
            keyword: _addRow.keyword,
            intent: _addRow.intent ,
            story_name: _addRow.story,
        })
        
        this.view.addRow.highlight = false
        this.view.addRow.inputDisabled = true
  
    }
 
    updateNlpRecordRow(item) {
        this.nlpRecordsService.nextUpdateNlpRecordRow({
            id: item.id,
            keyword: item.keyword,
            intent: item.intent,
            story_name: item.story_name
        })
    }

    beforeDestroy() {

        this.$searchNlpRecordsServiceSubscription.unsubscribe()
        this.$getNlpRecordsByInfiniteScrollSubscription.unsubscribe()
        this.$uploadXlSXNlpRecordUnSubscription.unsubscribe()
        this.$updateNlpRecordRowSubscription.unsubscribe()
        this.nlpRecordsService.nextPageNlpRecordsByInfiniteScroll(1)
        
        // set page index to 1
        this.view = new NlpRecordViewModel()
    }
}