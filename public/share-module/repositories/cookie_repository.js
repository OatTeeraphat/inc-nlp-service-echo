export class CookieRepository {
    
    constructor(cookies) {
        // by cookie-js
        this.cookies = cookies
    }

    setClientSession(value, duration = 7) {
        return this.cookies.set("x-client-session", value, { expires: duration })
    }

    removeClientSession() {
        return this.cookies.remove("x-client-session")
    }

    getClientSession() {
        return this.cookies.get("x-client-session")
    }
}