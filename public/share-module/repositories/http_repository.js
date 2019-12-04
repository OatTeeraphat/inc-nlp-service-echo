export class HttpRepository {

    constructor(cookieRepo) {
        this.cookieRepo = cookieRepo
        this.BASE_API = "http://localhost:3000"
    }

    _getAuthorizedBearer() {
        return `Bearer ${this.cookieRepo.getClientSession()}`
    }

    // END_POINT: /v1/login
    clientSignIn(username, password) {
        return ajax({
            method: "POST",
            url: `${this.BASE_API}/login`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: username,
                password: password
            }
        })
    }

    // END_POINT: ############# TODO ###############
    signOut() {
        return of()
    }

    // END_POINT: /v1/nlp/record/pagination?page=
    getNlpRecordsPagination(page) {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/v1/nlp/record/pagination?page=${page}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer()
            }
        })
    }

    getNlpRecordsByKeyword(keyword) {
        return ajax({
            method: "GET",
            url: `${getHttpHost()}/v1/nlp/record/reply?keyword=${keyword}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer()
            }
        })
    }

    // END_POINT: /v1/nlp/record/pagination?keyword=&page=
    getNlpRecordsPaginationByKeyword(keyword, page) {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/v1/nlp/record/pagination?keyword=${keyword}&page=${page}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer()
            }
        })
    }


    uploadXlSXNlpRecord(formData) {
        return ajax({
            method: "POST",
            url: `${this.BASE_API}/v1/nlp/record/upload.xlsx`,
            headers: {
                // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryLcTweZ2GeXVdMSMa',
                'Authorization': this._getAuthorizedBearer()
            },
            body: formData,
        })
    }



    // END_POINT: /v1/nlp/record/bulk
    bulkDeleteNlpRecordsByIDs(ids) {
        return ajax({
            method: "DELETE",
            url: `${this.BASE_API}/v1/nlp/record/bulk`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer()
            },
            body: ids
        })
    }

    // END_POINT: /v1/nlp/record?id=
    deleteNlpRecordByID(id) {
        return ajax({
            method: "DELETE",
            url: `${this.BASE_API}/v1/nlp/record?id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer()
            },
        })
    }

    // EndPoint: /v1/story
    getAllStories() {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/v1/story`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer()
            }
        })
    }

    // EndPoint: /v1/story?id=
    deleteStoryByID(id) {
        return ajax({
            method: "DELETE",
            url: `${this.BASE_API}/v1/story?id=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer()
            }
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
    getNlpTrainingLogPagination(keyword, intent, story, page) {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/v1/nlp/log/pagination?keyword=${keyword}&intent=${intent}&story=${story}&page=${page}`,
            headers: { "Authorization": this._getAuthorizedBearer() }
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

    getNlpConfidenceByClientID = () => of({ confidence: Math.floor(Math.random() * 90 + 10) }).pipe(
        delay(600)
    )

    setNlpConfidenceByClientID = () => of({}).pipe(
        delay(600)
    )

    getAppInfoByClientId = () => {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/user/2da25e71-8d18-4668-b3cf-4d3056baee6f/app`
        })
    }

    setAppInfoByClientId = (app_info) => of({}).pipe(
        delay(600)
    )

    getAppCredentialByAppId = () => {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/user/2da25e71-8d18-4668-b3cf-4d3056baee6f/secret`
        })
    }

    revokeAccessTokenByAppId = () => of({
        access_token: 'token re/' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
    }).pipe(
        delay(600)
    )

    revokeSecretByAppId = () => of({
        client_secret: 'secret re/' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    }).pipe(
        delay(600)
    )

}   