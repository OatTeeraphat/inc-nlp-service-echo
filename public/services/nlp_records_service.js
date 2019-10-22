class NlpRecordsService {
    constructor(httpRepository = new HttpRepository()) {
        this.httpRepository = httpRepository
    }

    getNlpRecordsPagination = (page) => {
        return this.httpRepository.getNlpRecordsPagination("keyword", "intent", "story", page).pipe(
            map( json => new GetNlpRecordsPagination().adapt(json.response) ),
        )
    }
}