class AuthenticationService {
    constructor(
        httpRepository = new HttpRepository(),
        sweetAlertAjaxWrapper = new SweetAlertAjaxWrapper()
    ) {
        this.httpRepository = httpRepository
        this.sweetAlertAjaxWrapper = sweetAlertAjaxWrapper
    }

    signIn = (username, password) => {
        return of({ username, password }).pipe(
            debounceTime(300),
            switchMap( it => {
                let isNotEmpty = it.username != "" && it.password != ""

                if (isNotEmpty) {
                    return this.httpRepository.signIn(username, password)
                }

                return throwError(new Error("username or password can not be empty"))
            })
        )
    }
    
}