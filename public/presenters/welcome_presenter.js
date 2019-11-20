class WelcomePresenter {
    constructor(nlpReplyCounterService) {
        this.view = {
            isFlip: false,
            type: "BY_FILL_FEEL",
            initialNlpCounter: 0,
        }
        this.nlpReplyCounterService = nlpReplyCounterService
    }

    getInitialState() {
        return this.nlpReplyCounterService.getNlpReplyCounter().subscribe( it => {
            this.view.initialNlpCounter = this.view.initialNlpCounter + it.reply_count 
        })
    }

    nlpCounterDigitSpliter() { 
        return (""+ this.view.initialNlpCounter ).split("") 
    }

    disposal() { 
        this.nlpReplyCounterService.disposable() 
    }
}