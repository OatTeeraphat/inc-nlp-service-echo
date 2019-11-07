class NlpReplyStatisticService {
    constructor(httpRepository) {
        this.httpRepository = httpRepository
        this.unsubscribe = new Subject()
    }

    getNlpReplyStatistic = () => {
        return interval(1600).pipe(
            takeUntil(this.unsubscribe),
            concatMap( it => 
                this.httpRepository.getNlpReplyStatistic().pipe(
                    map( it => new GetNlpReplyStatisticAdapter().adapt(it) )
                )
            ))
    }

    disposable = () => {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}