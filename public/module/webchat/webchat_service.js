class WebChatService {
    
    constructor( socketRepo ) {
        this.socketRepo = socketRepo
        this.unsubscribe = new Subject()
        this.nextNlpKeywordSource$ = this.socketRepo.getFillChatNlpReplyModelWS()
    }
    
    getFillChatNlpReplyModelWS() {
        return this.nextNlpKeywordSource$.pipe(
            takeUntil(this.unsubscribe),
            retryWhen(errors =>
                errors.pipe(
                  tap(err => {
                    console.error('Got error', err);
                  }),
                  delay(1600)
                )
            ),
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }

    nextNlpKeyword(keyword_input) {
        this.nextNlpKeywordSource$.next(keyword_input)
    }
}

