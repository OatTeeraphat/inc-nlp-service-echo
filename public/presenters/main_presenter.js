var mainPresenter = Vue.component('main-presenter', {    
    template: `
    <div class="login-warp">
        <div class="justify-content-center">
            <div class="row justify-content-center login-logo">
                <img class="visible" src="assets/logo-white.png" alt="">
            </div>
            <form class="form-signin">
                
                <div class="linear-activity" v-bind:class="{ invisible: isNotSignInLoading }">
                    <div class="indeterminate"></div>
                </div>
                <div class="text-center mb-4">
                    <h1 class="h5 mb-3 font-weight-normal">Log in to your account</h1>
                    <p></p>
                </div>

                <label class="text-danger">{{ this.flashMessage }}</label>
                <div class="form-label-group">
                    
                    <input v-model="username" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                    <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <label for="inputPassword">Password</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                    <input :value="rememberMe" v-model="rememberMe" type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button @click="signIn" class="btn btn-lg btn-primary btn-purple btn-block" type="submit">Sign in</button>
                <div class="text-center"><a class="btn btn-link mt-4 text-center" href="#" role="button"><small class="text-muted text-center">I'm forgot my password</small></a></a></div>

            </form>
        </div>
        <div class="fixed-bottom py-4">
            <div class="text-center">
                <a class="btn btn-link mt-4 text-center" href="#" role="button">
                    <small class="text-white text-center mr-2">Term & Privacy Policy</small>
                </a>
                <a class="btn btn-link mt-4 text-center" href="#" role="button">
                    <span class="text-white text-center">•</span>
                    <small class="text-white text-center ml-2">Instruction Manual</small>
                </a>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            isNotSignInLoading: true,
            flashMessage: "",
            username: "",
            password: "",
            rememberMe: false,
        }
    },
    created: function() {
        this.authService = new AuthenticationService()
    },
    methods: {
        toggleBodyClass(addRemoveClass, className) {
            const el = document.body;

            if (addRemoveClass === 'addClass') {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        },

        signIn() {
            this.isNotSignInLoading = false
            this.authService.signIn(this.username, this.password).subscribe(
                it => {
                    this.isNotSignInLoading = true
                },
                error => {
                    console.log(error)
                    this.flashMessage = error
                    this.isNotSignInLoading = true
                }
            )
        },

    },
    mounted() {
        this.toggleBodyClass('addClass', 'bg-purple');
    },
    destroyed() {
        this.toggleBodyClass('removeClass', 'bg-purple');
    }
})