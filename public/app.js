const cookieRepo = new CookieRepository(Cookies)
// helpers initialize
// const swalHelp = new SweetAlertAjaxHelper()

// repositories initialize
const httpRepo = new HttpRepository()
const cacheRepo = new CacheStorageRepository()
const socketRepo = new SocketRepository()
const localStorageRepo = new LocalStorageRepository()

class AuthGuard {

    constructor(CookieRepository) {
        this.cookieRepository = CookieRepository
    }

    ifNotAuthenticated = (to, from, next) => {
        let isAuth = this.cookieRepository.getCustomerSession() !== undefined
    
        if (!isAuth) {
            next()
            return
        }
        next("/dashboard")
    }
    
    ifAuthenticated = (to, from, next) => {
        let isAuth = this.cookieRepository.getCustomerSession() !== undefined
        if (isAuth) {
            next()
            return
        }
    
        next('/login')
    }

}

const authGuard = new AuthGuard(cookieRepo)

const routes = [
    { path: '/', name: 'auth',  component: mainPresenter, beforeEnter: authGuard.ifNotAuthenticated },
    { path: '/login', name: 'login',  component: mainPresenter, beforeEnter: authGuard.ifNotAuthenticated },
    { path: '/welcome', name: 'welcome',  component: welcomePresenter },
    { path: '/dashboard', name: 'dashboard', component: dashboardPresenter, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    { path: '/nlp', name: 'nlp', component: nlpRecordsPresenter, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    { path: '/logs', name: 'logs', component: nlpLogPresenter, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    { path: '/story', name: 'story', component: storyPresenter, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    { path: '/webchat', name: 'webchat', component: webChatPresenter, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    // TODO: change to settingPresenter
    { path: '/setting', name: 'setting', component: settingPresenter, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    { path: '/logging', name: 'logging', component: logsPresenter, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
]

// vue Router
const vueRouter = new VueRouter({ routes, mode: 'history' });

// service initialize
const authService = new AuthenticationService(httpRepo, vueRouter, cookieRepo)
const storyService = new StoryService(httpRepo, vueRouter, cookieRepo)
const webChatService = new WebChatService(socketRepo)
const nlpRecordsService = new NlpRecordsService(httpRepo, vueRouter, localStorageRepo, cookieRepo)
const nlpTrainingLogService = new NlpTrainingLogService(httpRepo, vueRouter, cookieRepo)
const nlpReplyCounterService = new NlpReplyCounterService(httpRepo)

Vue.use({
    // The install method will be called with the Vue constructor as the first argument, along with possible options
    install (Vue, options = {}) {   
        // Add $surname instance property directly to Vue components
        Vue.prototype.$authService = authService
        Vue.prototype.$storyService = storyService
        Vue.prototype.$webChatService = webChatService,
        Vue.prototype.$nlpRecordsService = nlpRecordsService
        Vue.prototype.$nlpTrainingLogService = nlpTrainingLogService
        Vue.prototype.$nlpReplyCounterService = nlpReplyCounterService
    }
})

Vue.use(VueRouter)

new Vue({
    el: '#app',
    router: vueRouter
})