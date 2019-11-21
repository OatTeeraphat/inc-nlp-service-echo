class AuthenticationViewModel {
    constructor() {
        this.isNotSignInLoading =  true
        this.username =  "admin@incommonstudio.com"
        this.password =  "inc12490!"
        this.rememberMe =  false
    }
}

class AuthenticationPresenter {
    constructor(authenticationService) {
        this.view = new AuthenticationViewModel()
        this.authenticationService = authenticationService
    }

    clientSignIn() {
        this.view.isNotSignInLoading = false
        return this.authenticationService
            .signIn(this.view.username, this.view.password, this.view.rememberMe)
            .subscribe(
                () => { this.view.isNotSignInLoading = true },
                () => { this.view.isNotSignInLoading = true },
                () => { console.info("complete login") }
            )
    }

    clientSignOut() {
        this.authenticationService.signOut()
    }

    toggleBackGround(addRemoveClass, className) {
        const el = document.body;

        if (addRemoveClass === 'addClass') {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }
}