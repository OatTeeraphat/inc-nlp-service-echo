const { ajax, AjaxRequest, AjaxResponse, AjaxError, AjaxTimeoutError } = rxjs.ajax

class HttpRepository {

    constructor(cookiesHelper) {
        this.cookiesHelper = cookiesHelper
    }

    getNlpRecordsPagination = (keyword, intent, story, page) => ajax ({
        method: "GET", 
        url: getHttpHost() + `/v1/nlp/record/pagination?keyword=${keyword}&intent=${intent}&story=${story}&page=${page}`, 
        headers: { "Cache-Control": "max-age=30000" }
    })

    getAllStories = () => ajax({ 
        method: "GET", 
        url: getHttpHost() + '/v1/story',
        headers: { "Cache-Control": "max-age=30000" }
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

    signIn = (username, password) => of({ username, password }).pipe(
        delay(600)
    )

    signOut = () => of()

}