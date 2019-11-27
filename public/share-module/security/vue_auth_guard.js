export class AuthGuard {
    constructor(CookieRepository) {
        this.cookieRepository = CookieRepository
    }

    ifNotAuthenticated = (to, from, next) => {
        let isAuth = this.cookieRepository.getClientSession() !== undefined
    
        if (!isAuth) {
            next()
            return
        }
        next("/dashboard")
    }
    
    ifAuthenticated = (to, from, next) => {
        let isAuth = this.cookieRepository.getClientSession() !== undefined
        if (isAuth) {
            next()
            return
        }

        swal2('error', { text: "ไม่มีสิทธิ์เข้าถึงการใช้งาน"})
        next('/login')
    }
}