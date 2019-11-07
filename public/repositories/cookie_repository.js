class CookieRepository {
    
    constructor(cookies) {
        // by cookie-js
        this.cookies = cookies
    }

    setCustomerSession(value, duration = 7) {
        return this.cookies.set("x-customer-session", value, { expires: duration })
    }

    removeCustomerSession() {
        return this.cookies.remove("x-customer-session")
    }

    getCustomerSession() {
        return this.cookies.get("x-customer-session")
    }
}