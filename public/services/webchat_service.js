class WebChatService {

    rxSubjectWS = new RxSubjectWS()
    nextNlpKeywordSource$ = this.rxSubjectWS.fillChatNlpReplyModelWS()

    subscription(nlp_model) {
        return this.nextNlpKeywordSource$
            .pipe(
                debounceTime(300)
            )
            .subscribe(
                (msg) => {
                    console.info(msg)
                    nlp_model.keyword = msg.keyword
                    nlp_model.intent = msg.intent
                    nlp_model.distance = msg.distance
                },
                (err) => console.error(err),
                () => { console.log('complete')}
            )
    }

    nextNlpKeyword(keyword_input) {
        this.nextNlpKeywordSource$.next(keyword_input)
    }
}