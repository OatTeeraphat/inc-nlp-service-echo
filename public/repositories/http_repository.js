class HttpRepository {

    constructor() {
    }
    
    // END_POINT: ############# TODO ###############
    signIn(username, password) {
        return of({
            "consumer_id": "fe62eca5-f4d3-468c-b628-1142214dbf87",
            "username": "mock_chanasit",
            "email": "mock_chanasit@gmail.com",
            "access_token": "hOurGBmIfSlp6r2GBLwIf9zJNF9xusuL",
            "refresh_token": "zK40mQb7KmROVc5jL7Ef1gbI7ewnqXsC",
            "expires_in": 7776000
        }).pipe(
            delay(1600)
        )
    }
    
    // END_POINT: ############# TODO ###############
    signOut() {
        return of()
    }

    // END_POINT: /v1/nlp/record/pagination?page=
    getNlpRecordsPagination(page) {
        return ajax ({
            method: "GET", 
            url: getHttpHost() + `/v1/nlp/record/pagination?page=${page}`, 
        })
    }

    // END_POINT: /v1/nlp/record/pagination?keyword=&page=
    getNlpRecordsPaginationByKeyword(keyword, page) {
        return ajax ({
            method: "GET", 
            url: getHttpHost() + `/v1/nlp/record/pagination?keyword=${keyword}&page=${page}`, 
        })
    }

    // END_POINT: /v1/nlp/record/bulk
    bulkDeleteNlpRecordsByIDs(ids) {
        return ajax({
            method: "DELETE", 
            url: getHttpHost() + `/v1/nlp/record/bulk`,
            headers: { "Content-Type": "application/json" },
            body: ids
        })
    }

    // END_POINT: /v1/nlp/record?id=
    deleteNlpRecordByID(id) {
        return ajax({
            method: "DELETE",
            url: getHttpHost() + `/v1/nlp/record?id=${id}`
        })
    }

    // EndPoint: /v1/story
    getAllStories() {
        return ajax({ 
            method: "GET", 
            url: getHttpHost() + '/v1/story',
        })
    }

    // EndPoint: /v1/story?id=
    deleteStoryByID(id) {
        return ajax({ 
            method: "DELETE", 
            url: getHttpHost() + `/v1/story?id=${id}` 
        })
    }

    // END_POINT: ############# TODO ###############
    deleteNlpTrainingLogByID() {
        return of({}).pipe(
            delay(600)
        )
    }

    // END_POINT: ############# TODO ###############
    bulkDeleteNlpTrainingLogsByIDs() {
        return of()
    }

    // END_POINT: /v1/nlp/log/pagination?keyword=&intent=&story=&page=
    getNlpTrainingLogPagination (keyword, intent, story, page) {
        return ajax ({
            method: "GET", 
            url: getHttpHost() + `/v1/nlp/log/pagination?keyword=${keyword}&intent=${intent}&story=${story}&page=${page}`, 
        })
    }

    // END_POINT: ############# TODO ###############
    getNlpReplyCounterByClientID() {
        return of({ reply_count: Math.floor(Math.random() * 3000) }).pipe(
            delay(600)
        )
    }

    // END_POINT: ############# TODO ###############
    getNlpReplyCounter() {
        return of({ reply_count: Math.floor(Math.random() * 3000) }).pipe(
            delay(600)
        )
    }

}