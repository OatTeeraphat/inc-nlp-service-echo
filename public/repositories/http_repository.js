class HttpRepository {

    constructor() {
        // this.$cache = new SomeClass()
    }
    signIn = (username, password) => of({
        "consumer_id": "fe62eca5-f4d3-468c-b628-1142214dbf87",
        "username": "mock_chanasit",
        "email": "mock_chanasit@gmail.com",
        "access_token": "hOurGBmIfSlp6r2GBLwIf9zJNF9xusuL",
        "refresh_token": "zK40mQb7KmROVc5jL7Ef1gbI7ewnqXsC",
        "expires_in": 7776000
    }).pipe(
        delay(1600)
    )

    signOut = () => of()

    getNlpRecordsPagination = (page) => ajax ({
        method: "GET", 
        url: getHttpHost() + `/v1/nlp/record/pagination?page=${page}`, 
    })

    getNlpRecordsPaginationByKeyword = (keyword, page) => ajax ({
        method: "GET", 
        url: getHttpHost() + `/v1/nlp/record/pagination?keyword=${keyword}&page=${page}`, 
    })

    getNlpTrainingLogPagination = (keyword, intent, story, page) => ajax ({
        method: "GET", 
        url: getHttpHost() + `/v1/nlp/log/pagination?keyword=${keyword}&intent=${intent}&story=${story}&page=${page}`, 
    })

    getAllStories = () => ajax({ 
        method: "GET", 
        url: getHttpHost() + '/v1/story',
    })

    deleteStoryByID = (id) => ajax({ 
        method: "DELETE", 
        url: getHttpHost() + '/v1/story?id=' + id 
    })

    bulkDeleteNlpRecordsByIDs = (ids) => of(ids).pipe(
        delay(600)
    )

    deleteNlpRecordByID = (id) => of(id).pipe(
        delay(600)
    )

    getNlpReplyCounterByClientID = () => of({ reply_count: Math.floor(Math.random() * 3000) }).pipe(
        delay(600)
    )

    getNlpReplyCounter = () => of({ reply_count: Math.floor(Math.random() * 3000) }).pipe(
        delay(600)
    )

    getNlpConfidenceByClientID = () => of({ confidence: Math.floor(Math.random() * 90 + 10) }).pipe(
        delay(600)
    )

    getAppInfoByClientId = () => of({
        id: "632861333807100",
        status : 1,
        name: "Inccommon Studio",
        owner: "Chanasit.B",
        plan: "unlimited"
    }).pipe(
        delay(600)
    )

    setAppInfoByClientId = (app_info) => of({}).pipe(
        delay(600)
    )

}