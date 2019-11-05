const routes = [
    { path: '/', name: 'auth',  component: mainPresenter },
    // { path: '/login', name: 'login',  component: mainPresenter },
    { path: '/dashboard', name: 'dashboard', component: dashboardPresenter, meta: { auth: true } },
    { path: '/nlp', name: 'nlp', component: nlpRecordsPresenter, meta: { auth: true } },
    { path: '/logs', name: 'logs', component: nlpLogPresenter, meta: { auth: true } },
    { path: '/story', name: 'story', component: storyPresenter, meta: { auth: true } },
    { path: '/webchat', name: 'webchat', component: webChatPresenter, meta: { auth: true } }
]

// helpers initialize
const helper1 = new SweetAlertAjaxHelper()

// repositories initialize
const repo0 = new HttpRepository()
const repo1 = new CacheStorageRepository()
const repo2 = new SocketRepository()
const repo3 = new LocalStorageRepository()
const repo4 = new CookieRepository(Cookies)


Vue.use({

    // The install method will be called with the Vue constructor as the first argument, along with possible options
    install (Vue, options = {}) {
        
        // ES6 way of const job = options.job
        const { } = options
        
        // Add $plugin instance method directly to Vue components
        Vue.prototype.$myInfo = (name, age) => {}

        // Add $surname instance property directly to Vue components
        Vue.prototype.$authService = new AuthenticationService(repo0, helper1, repo4)
        Vue.prototype.$nlpRecordsService = new NlpRecordsService(repo0, helper1)
        Vue.prototype.$storyService = new StoryService(repo0, helper1)
        Vue.prototype.$webChatService = new WebChatService(repo2)
    }
})

const router = new VueRouter({ routes, mode: 'history' });

Vue.use(VueRouter)

router.beforeEach( (to, from, next) => {

    // let isAuth = await repo4.getCustomerSession()

    // console.debug( `to.meta: ${to.path}  isAuth: ${isAuth}`)

    // if (to.meta.auth && isAuth === "token!") {
    //     console.debug("1")
    //     next('/login')
    // }

    // console.debug("2")
    next()
})

new Vue({
    el: '#app',
    router,    
})