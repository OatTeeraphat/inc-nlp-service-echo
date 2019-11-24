class NlpReplyCounterService {
    constructor(httpRepository) {
        this.httpRepository = httpRepository
        this.unsubscribe = new Subject()
    }

    getNlpReplyCounter = () => {
        return interval(1600).pipe(
            takeUntil(this.unsubscribe),
            concatMap( it => 
                this.httpRepository.getNlpReplyCounter().pipe(
                    map( it => new GetNlpReplyCounterAdapter().adapt(it) )
                )
            ))
    }

    disposable = () => {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}