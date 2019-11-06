class HttpRepository {

    constructor() {
        // this.$cache = new SomeClass()
    }
    
    signIn = (username, password) => of({ username, password, token: "token"}).pipe(
        delay(1600)
    )

    signOut = () => of()

    getNlpRecordsPagination = (keyword, intent, story, page) => ajax ({
        method: "GET", 
        url: getHttpHost() + `/v1/nlp/record/pagination?keyword=${keyword}&intent=${intent}&story=${story}&page=${page}`, 
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

    getNlpReplyStatisticByClientID = () => of({ reply_count: Math.floor(Math.random() * 3000) }).pipe(
        delay(600)
    )

    getNlpReplyStatistic = () => of({ reply_count: Math.floor(Math.random() * 3000) }).pipe(
        delay(600)
    )

}