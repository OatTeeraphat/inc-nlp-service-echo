class ViewModel {

}

export class NlpLoggingPresenter {
    constructor(nlpLoggingService) {
        this.view = new ViewModel()
        this.nlpLoggingService = nlpLoggingService
    }
}