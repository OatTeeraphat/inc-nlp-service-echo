class WelcomeViewModel {
    constructor() {
        this.isFlip = false
        this.type = "BY_FILL_FEEL"
        this.initialNlpCounter = 0
    }
}

export class WelcomePresenter {

    constructor(nlpReplyCounterService) {
        this.view = new WelcomeViewModel()
        this.nlpReplyCounterService = nlpReplyCounterService
        this.$pollingNlpReplyCounter = null
    }

    onMounted = () => {
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