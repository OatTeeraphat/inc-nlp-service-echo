class NlpReplyCounterService {
    constructor(httpRepository) {
        this.httpRepository = httpRepository
    }

    pollingNlpReplyCounter(pollingCallback) {
        return of(0).pipe(
                mergeMap( () =>
                    this.httpRepository
                        .getNlpReplyCounter()
                        .pipe(
                            map( it => new GetNlpReplyCounterAdapter().adapt(it) )
                        )
                ),
                tap(pollingCallback),
                delay(600),
                repeat()
            )
    }

}