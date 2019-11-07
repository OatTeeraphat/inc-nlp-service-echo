class NlpTrainingLogService {
    constructor(httpRepository) {
        this.httpRepository = httpRepository
    }

    getNlpTrainingLogPagination = () => {
        return this.httpRepository.getNlpTrainingLogPagination("keyword", "intent", "story", page).pipe(
            takeUntil(this.unsubscribe),
            map( ({ response }) => new GetNlpRecordsPagination().adapt() ),
        )
    }


}