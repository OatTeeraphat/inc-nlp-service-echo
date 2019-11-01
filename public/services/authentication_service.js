// authentication service
class AuthenticationService {

    constructor( httpRepository, sweetAlertAjaxWrapper ) {
        this.httpRepository = httpRepository
        this.sweetAlertAjaxWrapper = sweetAlertAjaxWrapper
    }

    signIn = (username, password) => {
        return of({ username, password }).pipe(
            debounceTime(300),
            switchMap(
                it => {
                    if (this.isEmptyUsernameAndPassword(it)) {
                        return throwError("username or password can not be empty")
                    }

                    if (this.isNotEmail(it.username)) {
                        return throwError("email invalid format")
                    }
                    return this.httpRepository.signIn(it.username, it.password)
                }
            ),
            catchError(e => {
                console.error(e)

                if ( e instanceof AjaxError ) {
                    return throwError(e)
                }
                
                return throwError(e)
            })
        )
    }

    isNotEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(String(email).toLowerCase());
    }

    isEmptyUsernameAndPassword = ({ username, password }) => {
        return username == "" || password == ""
    }
    
}