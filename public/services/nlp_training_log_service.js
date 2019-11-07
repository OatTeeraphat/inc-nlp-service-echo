class NlpTrainingLogService {
    constructor(httpRepository) {
        this.httpRepository = httpRepository
        this.unsubscribe = new Subject()
    }

    getNlpTrainingLogPagination = (page) => {
        return this.httpRepository.getNlpTrainingLogPagination("keyword", "intent", "story", page).pipe(
            takeUntil(this.unsubscribe),
            map( ({ response }) => { 
                return new GetNlpTrainingLogPaginationAdapter().adapt(response) 
            }),
        )
    }


    disposable = () => {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }


}