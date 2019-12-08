export class CookieRepository {

    constructor(cookies) {
        // by cookie-js
        this.cookies = cookies
    }

    setClientSession(cookieValues, duration = 7) {
        const { access_token, consumer_id } = cookieValues
        this.cookies.set("x-client-id", consumer_id, { expires: duration })
        return this.cookies.set("x-client-session", access_token, { expires: duration })
    }

    removeClientSession() {
        this.cookies.remove("x-client-id")
        return this.cookies.remove("x-client-session")
    }

    getClientSession() {
        return this.cookies.get("x-client-session")
    }

    getClientId() {
        return this.cookies.get("x-client-id")
    }
}