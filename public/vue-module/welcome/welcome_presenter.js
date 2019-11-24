class WelcomeViewModel {
    constructor() {
        this.isFlip = false
        this.type = "BY_FILL_FEEL"
        this.initialNlpCounter = 0
    }
}

class WelcomePresenter {

    constructor(nlpReplyCounterService) {
        this.view = new WelcomeViewModel()
        console.log(this.view)
        this.nlpReplyCounterService = nlpReplyCounterService
        this.$pollingNlpReplyCounter = null
    }

    onMounted = () => {
        console.log(this.view)
        this.$pollingNlpReplyCounter = this.nlpReplyCounterService.pollingNlpReplyCounter(this.pollingCallBackNlpReplyCounter).subscribe()
    }
    
    pollingCallBackNlpReplyCounter = (it) => {
        console.debug(it.reply_count)
        this.view.initialNlpCounter = this.view.initialNlpCounter + it.reply_count
    }

    nlpCounterDigitSpliter() { 
        return (""+ this.view.initialNlpCounter ).split("") 
    }

    beforeDestroy() {
        this.$pollingNlpReplyCounter.unsubscribe()
    }
}