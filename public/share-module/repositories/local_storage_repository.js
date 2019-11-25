export class LocalStorageRepository {
    constructor() {}

    getRecentlyNlpRecordSearch() {
        return JSON.parse(localStorage.getItem("nlp_record_search_history"))
    }

    setRecentlyNlpRecordSearch(keyword) {

        let domain = JSON.parse(localStorage.getItem("nlp_record_search_history"))

        if (domain === null ) {
            domain = {}
        }
        
        domain[keyword] = +new Date()

        localStorage.setItem("nlp_record_search_history", JSON.stringify(domain))
    }

    removeNlpRecordSearch() {
        localStorage.removeItem("nlp_record_search_history")
    }

    clearNlpRecordSearch() {
        localStorage.removeItem("nlp_record_search_history")
    }
}