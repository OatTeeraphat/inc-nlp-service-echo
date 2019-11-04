class CookieRepository {
    
    constructor(cookies) {
        this.cookies = cookies
        console.log(this.cookies)
    }

    setUserSession(value, duration = "1D") {
        return this.cookies.set("user", value, duration)
    }

    removeUserSession() {
        return this.cookies.remove("user")
    }

    getUserSession() {
        return this.cookies.get("user")
    }
}