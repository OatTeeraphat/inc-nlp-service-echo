class AuthenticationViewModel {
    constructor() {
        this.isNotSignInLoading =  true
        this.username =  "kai.chr160@gmail.com"
        this.password =  "kai31416"
        this.rememberMe =  true
    }
}

export class AuthenticationPresenter {
    constructor(authenticationService) {
        this.view = new AuthenticationViewModel()
        this.authenticationService = authenticationService
        this.$clientSignInSubscription = null
    }

    onMounted = () => {
        console.log("getInitialState")
        this.$clientSignInSubscription = this.authenticationService
            .clientSignInObservable()
            .subscribe(
                next => { this.view.isNotSignInLoading = true }
            )
    }

    clientSignIn() {
        this.view.isNotSignInLoading = false
        this.authenticationService.newClientSignInEvent(
            this.view.username, 
            this.view.password, 
            this.view.rememberMe
        )
    }

    clientSignOut() {
        this.authenticationService.clientSignOut()
    }

    toggleBackGround(addRemoveClass, className) {
        const el = document.body;

        if (addRemoveClass === 'addClass') {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

    beforeDestroy() {
        this.view.username = ""
        this.view.password = ""
        this.$clientSignInSubscription.unsubscribe()
    }
}