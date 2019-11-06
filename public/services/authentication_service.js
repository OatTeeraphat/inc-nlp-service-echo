// authentication service
class AuthenticationService {

    constructor( httpRepository, sweetAlertAjaxWrapper, cookieRepository) {
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.sweetAlertAjaxWrapper = sweetAlertAjaxWrapper
    }

    signOut = () => {
        return this.cookieRepository.removeCustomerSession()
    }

    isAuthentication = () => {
        return this.cookieRepository.getCustomerSession() !== undefined
    }

    // ล้อกอินจ้า
    signIn = (username, password, rememberMe) => {
        return of({ username, password }).pipe(
            debounceTime(300),
            switchMap(
                it => {
                    if (this.isEmptyUsernameOrPassword(it)) {
                        return throwError("username or password can not be empty")
                    }

                    if (this.isNotEmail(it.username)) {
                        return throwError("email invalid format")
                    }
                    return this.httpRepository.signIn(it.username, it.password).pipe(
                        map( it => {
                            let {username, token, expired} = it
                            console.log(rememberMe)

                            if (rememberMe) {
                                this.cookieRepository.setCustomerSession(token, 365)
                                return 
                            }
                            
                            this.cookieRepository.setCustomerSession(token)
                            return
                        })
                    )
                }
            ),
            catchError(e => {
                console.error(e)

                if ( e instanceof AjaxError ) { return throwError(e)
                }
                
                return throwError(e)
            })
        )
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
    
}