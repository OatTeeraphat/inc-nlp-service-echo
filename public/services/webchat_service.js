class WebChatService {
    
    constructor(
        socketRepo = new SocketRepository(), 
    ) {
        this.socketRepo = socketRepo
        this.keepChatLogsSource$ = new Subject()

        this.nextNlpKeywordSource$ = this.socketRepo.getFillChatNlpReplyModelWS()
        this.zipWebChatEventSource$ = zip(this.nextNlpKeywordSource$, this.keepChatLogsSource$)
    }
    
    zipEventSourceSubscription(nlp_model, chat_logs) {
        return this.zipWebChatEventSource$
        .pipe(
            retryWhen(errors =>
                errors.pipe(
                  tap(err => {
                    console.error('Got error', err);
                  }),
                  delay(1600)
                )
            ),
            debounceTime(100)
            )
        .subscribe( 
            event => {
                nlp_model.keyword = event[0].keyword
                nlp_model.intent = event[0].intent
                nlp_model.distance = event[0].distance

                chat_logs.push(Object.assign({}, { 
                    keyword: event[0].keyword, 
                    intent: event[0].intent 
                }))

            },
            error => {
                console.log(error)
            },
            () => {
                console.log("complete")
            }
        )
    }

    keepWebChatLogs(nlp_model_log) {
        this.keepChatLogsSource$.next(nlp_model_log)
    }

    nextNlpKeyword(keyword_input) {
        this.nextNlpKeywordSource$.next(keyword_input)
    }
}