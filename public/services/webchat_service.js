const { debounceTime, map, pipe, take, skip, retryWhen, tap, delay } = rxjs.operators
const { Subject, zip, forkJoin } = rxjs

class WebChatService {
    webChatRepo = new WebChatRepository()
    nextNlpKeywordSource$ = this.webChatRepo.getFillChatNlpReplyModelWS()
    keepWebChatLogsSource$ = new Subject()

    zipEventSource$ = zip(this.nextNlpKeywordSource$, this.keepWebChatLogsSource$)

    zipEventSourceSubscription(nlp_model, chat_logs) {
        return this.zipEventSource$
        .pipe(
            retryWhen(errors =>
                errors.pipe(
                  tap(err => {
                    console.error('Got error', err);
                  }),
                  delay(1000)
                )
            ),
            debounceTime(100)
            )
        .subscribe( 
            event => {
                nlp_model.keyword = event[0].keyword
                nlp_model.intent = event[0].intent
                nlp_model.distance = event[0].distance
                chat_logs.push(Object.assign({}, nlp_model))
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
        this.keepWebChatLogsSource$.next(nlp_model_log)
    }

    nextNlpKeyword(keyword_input) {
        this.nextNlpKeywordSource$.next(keyword_input)
    }
}