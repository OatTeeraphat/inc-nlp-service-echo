class AuthenticationPresenter {
    constructor(authenticationService) {
        this.view = {
            isNotSignInLoading: true,
            username: "admin@incommonstudio.com",
            password: "inc12490!",
            rememberMe: false,
        }
        this.authenticationService = authenticationService
    }

    clientSignIn() {
        this.view.isNotSignInLoading = false
        return this.authenticationService
            .signIn(this.view.username, this.view.password, this.view.rememberMe)
            .subscribe(
                next => { this.view.isNotSignInLoading = true },
                error => { this.view.isNotSignInLoading = true },
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