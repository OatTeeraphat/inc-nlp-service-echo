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