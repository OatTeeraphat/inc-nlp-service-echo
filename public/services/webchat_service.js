class WebChatService {
    
    constructor(
        socketRepo = new SocketRepository(), 
    ) {
        this.socketRepo = socketRepo
        this.keepChatLogsSource$ = new Subject()

        this.nextNlpKeywordSource$ = this.socketRepo.getFillChatNlpReplyModelWS()
        this.zipWebChatEventSource$ = zip(this.nextNlpKeywordSource$, this.keepChatLogsSource$)
    }
    
    zipEventSourceSubscription(chat_logs) {
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
                chat_logs.push(
                    new GetNlpChatLogsAdapter().adapt(event[0])
                )
                console.log(chat_logs)
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