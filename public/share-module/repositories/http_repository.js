export class HttpRepository {

    constructor(cookieRepo) {
        this.cookieRepo = cookieRepo
        this.BASE_API = getHttpHost()
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

    insertNlpRecords(nlpRecord){
        return ajax({
            method: "POST",
            url: `${this.BASE_API}/v1/nlp/record`,
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": this._getAuthorizedBearer()
            },
            body: {
                keyword: nlpRecord.keyword,
                intent: nlpRecord.intent,
                story_name: nlpRecord.story_name
            }
        })
    }

    putNlpRecord(id, keyword, intent, story_name) {
        console.log(id, keyword, intent, story_name)
        return ajax ({
            method: "PUT", 
            url: `${this.BASE_API}/v1/nlp/record`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer() 
            },
            body: {	
                "id": id,
                "keyword": keyword,
                "intent": intent,
                "story_id": story_name
            }
        })
    }

    readNlpLogging(id) {
        return ajax({
            methods: "GET",
            url: `${this.BASE_API}/v1/nlp/dashboard/gte?=${id}`,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer() 
            },
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
        // return ajax({ 
        //     method: "GET", 
        //     url: `${this.BASE_API}/v1/story`,
        //     headers: { 
        //         "Content-Type": "application/json",
        //         "Authorization": this._getAuthorizedBearer() 
        //     }
        // })

        return of([
            { id: 1, name: "GREETING", desc: "good for greet", owner: "632861333807100" },
            { id: 2, name: "FAQ", desc: "good for greet", owner: "632861333807100" },
            { id: 3, name: "PRODUCT", desc: "good for greet", owner: "632861333807100" }
        ]).pipe(
            delay(600)
        )
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

    // END_POINT: /v1/nlp/log?id=
    deleteNlpTrainingLogByID(id) {
        return ajax({
            method: "DELETE", 
            url: `${this.BASE_API}/v1/nlp/log?id=${id}`,
            headers: { 
                "Authorization": this._getAuthorizedBearer() 
            }
        })
    }

    // END_POINT: /v1/nlp/log/bulk
    bulkDeleteNlpTrainingLogsByIDs(body) {
        return ajax({
            method: "DELETE", 
            url: `${this.BASE_API}/v1/nlp/log/bulk`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._getAuthorizedBearer() 
            },
            body: body
        })
    }

    // END_POINT: /v1/nlp/log/pagination?keyword=&intent=&story=&page=
    getNlpTrainingLogPagination(keyword, intent, story, page) {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/v1/nlp/log/pagination?keyword=${keyword}&intent=${intent}&story=${story}&page=${page}`,
            headers: { "Authorization": this._getAuthorizedBearer() }
        })
    }

    // END_POINT: ############# TODO: ###############
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

    // END_POINT: ############# TODO: ###############
    getNlpConfidenceByClientID = () => of({ confidence: Math.floor(Math.random() * 90 + 10) }).pipe(
        delay(600)
    )

    // END_POINT: ############# TODO: ###############
    setNlpConfidenceByClientID = () => of({}).pipe(
        delay(600)
    )

    getAppInfoByClientId = () => {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/user/3794bfa3-b010-43fd-a670-d604c7740bda/app`
        })
    }

    // END_POINT: ############# TODO: ###############
    setAppInfoByClientId = (app_info) => of({}).pipe(
        delay(600)
    )

    getAppCredentialByAppId = () => {
        return ajax({
            method: "GET",
            url: `${this.BASE_API}/user/3794bfa3-b010-43fd-a670-d604c7740bda/secret`
        })
    }

    // END_POINT: ############# TODO: ###############
    revokeAccessTokenByAppId = () => of({
        access_token: 'token re/' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
    }).pipe(
        delay(600)
    )
    
    // END_POINT: ############# TODO: ###############
    revokeSecretByAppId = () => of({
        client_secret: 'secret re/' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    }).pipe(
        delay(600)
    )

    /*
     way of faster! >> return previous 15 day without period varible
     call : amount of call nlp api per day
     avg_time : average of request time by day
    */

    getApiStatInPeriodByAppId = (period) => of(
        [   
            { time: "2019-11-01 00:00:00.00+00", call: "0", avg_time : "0" },
            { time: "2019-11-02 00:00:00.00+00", call: "40", avg_time: "82.32"  },
            { time: "2019-11-03 00:00:00.00+00", call: "320", avg_time: "120.2"  },
            { time: "2019-11-04 00:00:00.00+00", call: "140", avg_time: "112.26"  },
            { time: "2019-11-05 00:00:00.00+00", call: "160", avg_time: "130.39"  },
            { time: "2019-11-06 00:00:00.00+00", call: "75", avg_time: "90.16"  },
            { time: "2019-11-07 00:00:00.00+00", call: "10", avg_time: "60.33"  },
            { time: "2019-11-08 00:00:00.00+00", call: "40", avg_time: "92.51"  },
            { time: "2019-11-09 00:00:00.00+00", call: "320", avg_time: "123.01"  },
            { time: "2019-11-10 00:00:00.00+00", call: "140", avg_time: "152.33"  },
            { time: "2019-11-11 00:00:00.00+00", call: "160", avg_time: "72.04"  },
            { time: "2019-11-12 00:00:00.00+00", call: "75", avg_time: "92.30"  },
            { time: "2019-11-13 00:00:00.00+00", call: "320", avg_time: "98.43"  },
            { time: "2019-11-14 00:00:00.00+00", call: "140", avg_time: "91.52"  },
            { time: "2019-11-15 00:00:00.00+00", call: "75", avg_time: "134.66"  },
        ]
    ).pipe(
        delay(600)
    )

    /*
     way of faster! >> return previous 15 day without period varible
     amount : amount increse of nlp training set size
    */

    getDataGrowthInPeriodByAppId = (period) => of(
        [
            { time: "2019-11-01 00:00:00.00+00", amount: "0" },
            { time: "2019-11-02 00:00:00.00+00", amount: "40" },
            { time: "2019-11-03 00:00:00.00+00", amount: "360" },
            { time: "2019-11-04 00:00:00.00+00", amount: "500" },
            { time: "2019-11-05 00:00:00.00+00", amount: "660" },
            { time: "2019-11-06 00:00:00.00+00", amount: "735" },
            { time: "2019-11-07 00:00:00.00+00", amount: "745" },
            { time: "2019-11-08 00:00:00.00+00", amount: "780" },
            { time: "2019-11-09 00:00:00.00+00", amount: "1100" },
            { time: "2019-11-10 00:00:00.00+00", amount: "1240" },
            { time: "2019-11-11 00:00:00.00+00", amount: "1400" },
            { time: "2019-11-12 00:00:00.00+00", amount: "1475" },
            { time: "2019-11-13 00:00:00.00+00", amount: "1790" },
            { time: "2019-11-14 00:00:00.00+00", amount: "1880" },
            { time: "2019-11-15 00:00:00.00+00", amount: "1950" },
        ]
    ).pipe(
        delay(600)
    )

    /*
     way of faster! >> return previous 15 day without period varible
     amount : amount of call nlp api per day
     slove : nlp can be slove with confidence rule per day
     ** future plan : can query slove by toggle confidence value
    */

    getModelStatInPeriodByAppId = (period, confidence) => of(
        [
            { time: "2019-11-01 00:00:00.00+00", amount: "0", slove: "0" },
            { time: "2019-11-02 00:00:00.00+00", amount: "40", slove: "14" },
            { time: "2019-11-03 00:00:00.00+00", amount: "320", slove: "92" },
            { time: "2019-11-04 00:00:00.00+00", amount: "140", slove: "60" },
            { time: "2019-11-05 00:00:00.00+00", amount: "160", slove: "68" },
            { time: "2019-11-06 00:00:00.00+00", amount: "75", slove: "51" },
            { time: "2019-11-07 00:00:00.00+00", amount: "10", slove: "7" },
            { time: "2019-11-08 00:00:00.00+00", amount: "40", slove: "30" },
            { time: "2019-11-09 00:00:00.00+00", amount: "320", slove: "215" },
            { time: "2019-11-10 00:00:00.00+00", amount: "140", slove: "98" },
            { time: "2019-11-11 00:00:00.00+00", amount: "160", slove: "130" },
            { time: "2019-11-12 00:00:00.00+00", amount: "75", slove: "69" },
            { time: "2019-11-13 00:00:00.00+00", amount: "320", slove: "302" },
            { time: "2019-11-14 00:00:00.00+00", amount: "140", slove: "132" },
            { time: "2019-11-15 00:00:00.00+00", amount: "75", slove: "71" },
        ]
    ).pipe(
        delay(600)
    )

    /*
      notice : "Non Training" always Last row of limit 
               ( story[*] limit-1 row, story[Non Training] 1row, summary 15 row )
    */

    getCountNlpSetInStoryByAppId = (limit) => of (
        [
            { story_name: "GREETING", amount: 120 },
            { story_name: "FAQ", amount: 140 },
            { story_name: "CHITCHAT", amount: 260 },
            { story_name: "PRODUCT", amount: 297 },
            { story_name: "Non Training", amount: 529 }
        ]
    ).pipe(
        delay(300)
    )

    getBubbleChart = (limit) => of(
        [
            {
                label: 'GREETING',
                data: [ 
                    { intent: "สวัสดีจ้า", call: "1938" },
                    { intent: "หิวมั้ย", call: "1038" },
                    { intent: "สบายดีรึป่าว", call: "7" },
                    { intent: "มีคนมั้ย", call: "7" },
                    { intent: "Hello Dog", call: "32" }
                ]
            },
            {
                label: 'CHITCHAT',
                data: [
                    { intent: "กินข้าวยัง", call: "1438" },
                    { intent: "ชื่อรัยอ่ะ", call: "913" },
                    { intent: "รักน่ะเด็กดื้อ", call: "412" },
                    { intent: "ดีจังตังอยู่ครบ", call: "12" }
                ]
            },
            {
                label: 'FAQ',
                data: [
                    { intent: "ถามใรตอบได้", call: "112" },
                    { intent: "จัดส่งอย่างไร", call: "42" },
                    { intent: "จัดส่งที่ไหน", call: "12" }
                ]
            },
            {
                label: 'PRODUCT',
                data: [
                    { intent: "อยากดูของ", call: "95" },
                    { intent: "มีรัยขาย", call: "42" },
                    { intent: "ของหมดแล้วต้องสั่งนะ", call: "12" }
                ]
            }
        ]
    ).pipe(
        delay(1000)
    )


}   