class WebChatService {
    
    constructor(
        socketRepo = new SocketRepository(), 
    ) {
        this.socketRepo = socketRepo
        this.nextNlpKeywordSource$ = this.socketRepo.getFillChatNlpReplyModelWS()
    }
    
    getFillChatNlpReplyModelWS() {
        return this.nextNlpKeywordSource$.pipe(
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

    nextNlpKeyword(keyword_input) {
        this.nextNlpKeywordSource$.next(keyword_input)
    }
}