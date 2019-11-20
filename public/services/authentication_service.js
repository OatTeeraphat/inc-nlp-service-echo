// authentication service
class AuthenticationService {

    constructor( httpRepository, vueRouter, cookieRepository, vueErrorHandler) {
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.vueRouter = vueRouter
        this.vueErrorHandler = vueErrorHandler
    }

    // ล้อกอินจ้า
    signIn = (username, password, rememberMe) => {
        return of({ username, password }).pipe(
            debounceTime(300),
            switchMap(
                it => {
                    if (this.isEmptyUsernameOrPassword(it)) return throwError("username or password can not be empty")
                    
                    if (this.isNotEmail(it.username)) return throwError("email invalid format")

                    return this.httpRepository.signIn(it.username, it.password).pipe(
                        map( ({ response }) => {

                            let model = new GetClientSignInAdapter().adapt(response)

                            if (rememberMe) {
                                this.cookieRepository.setClientSession(model.access_token, model.expired_date)
                            } else {
                                this.cookieRepository.setClientSession(model.access_token)
                            }
                            
                            return this.vueRouter.replace('/dashboard')
                        })
                    )
                }
            ),
            this.vueErrorHandler.catchError(),
        )
    }

    isAuthentication = () => {
        return this.cookieRepository.getClientSession() !== undefined
    }

    // เช็ค email format
    isNotEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(String(email).toLowerCase());
    }

    // เช็ค input box ว่างเปล่า
    isEmptyUsernameOrPassword = ({ username, password }) => {
        return username == "" || password == ""
    }

    signOut = () => {

        this.cookieRepository.removeClientSession()

        return this.vueRouter.replace("/")
    }
    
}