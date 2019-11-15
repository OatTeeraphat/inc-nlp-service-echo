// authentication service
class AuthenticationService {

    constructor( httpRepository, vueRouter, cookieRepository) {
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.vueRouter = vueRouter
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
                        map( it => {

                            let model = new GetCustomerSignInAdapter().adapt(it)

                            if (rememberMe) {
                                this.cookieRepository.setCustomerSession(model.access_token, model.expires_in)
                            } else {
                                this.cookieRepository.setCustomerSession(model.access_token)
                            }
                            
                            return this.vueRouter.push('/dashboard')
                        })
                    )
                }
            ),
            vueCatchError(this.cookieRepository, this.vueRouter),
        )
    }

    isAuthentication = () => {
        return this.cookieRepository.getCustomerSession() !== undefined
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

        this.cookieRepository.removeCustomerSession()

        return this.vueRouter.replace("/")
    }
    
}