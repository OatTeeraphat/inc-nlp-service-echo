(async () => console.log(`######### FillChat #########`) )()
// repositories initialize
const cookieRepo = new CookieRepository(Cookies)
const httpRepo = new HttpRepository(cookieRepo)
const cacheRepo = new CacheStorageRepository()
const socketRepo = new SocketRepository()
const localStorageRepo = new LocalStorageRepository()

const authGuard = new AuthGuard(cookieRepo)

const routes = [
    { path: '/', name: 'auth',  component: mainPage , beforeEnter: authGuard.ifNotAuthenticated },
    { path: '/login', name: 'login',  component: mainPage , beforeEnter: authGuard.ifNotAuthenticated },
    { path: '/welcome', name: 'welcome',  component: welcomePage },
    { path: '/dashboard', name: 'dashboard', component: dashboardPage, beforeEnter: authGuard.ifAuthenticated },
    { path: '/nlp', name: 'nlp', component: nlpRecordsPage, beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    { path: '/logs', name: 'logs', component: nlpTrainingLogPage , beforeEnter: authGuard.ifAuthenticated, meta: { keepAlive: true } },
    { path: '/story', name: 'story', component: storyPage , beforeEnter: authGuard.ifAuthenticated },
    { path: '/webchat', name: 'webchat', component: webChatPage, beforeEnter: authGuard.ifAuthenticated },
    { path: '/setting', name: 'setting', component: settingPage, beforeEnter: authGuard.ifAuthenticated },
    { path: '/logging', name: 'logging', component: logsPage , beforeEnter: authGuard.ifAuthenticated },
]

// vue Router
const vueRouter = new VueRouter({ routes, mode: 'history' });

// error handle initialize
const vueErrorHandler = new VueErrorHandler(cookieRepo, vueRouter)

// service initialize
const authService = new AuthenticationService(httpRepo, vueRouter, cookieRepo, vueErrorHandler)
const storyService = new StoryService(httpRepo, vueRouter, cookieRepo, vueErrorHandler)
const webChatService = new WebChatService(socketRepo, vueErrorHandler)
const nlpRecordsService = new NlpRecordsService(httpRepo, vueRouter, localStorageRepo, cookieRepo, vueErrorHandler)
const nlpTrainingLogService = new NlpTrainingLogService(httpRepo, vueRouter, cookieRepo, vueErrorHandler)
const nlpReplyCounterService = new NlpReplyCounterService(httpRepo, vueErrorHandler)
const settingService = new SettingService(httpRepo, vueErrorHandler)

// presenter initialize
const authPresenter = new AuthenticationPresenter(authService)
const welcomePresenter = new WelcomePresenter(nlpReplyCounterService)
const storyPresenter = new StoryPresenter(storyService)
const nlpTrainingLogPresenter = new NlpTrainingLogPresenter(nlpTrainingLogService)
const nlpRecordPresenter = new NlpRecordPresenter(nlpRecordsService)
const settingPresenter = new SettingPresenter(settingService, webChatService)

Vue.use({
    // The install method will be called with the Vue constructor as the first argument, along with possible options
    install (Vue) {

        Vue.prototype.$authPresenter = authPresenter
        Vue.prototype.$welcomePresenter = welcomePresenter
        Vue.prototype.$storyPresenter = storyPresenter
        Vue.prototype.$nlpTrainingLogPresenter = nlpTrainingLogPresenter
        Vue.prototype.$nlpRecordPresenter = nlpRecordPresenter
        Vue.prototype.$settingPresenter = settingPresenter

        // TODO:  inject presenter instead of service
        Vue.prototype.$webChatService = webChatService
            
    }
})

Vue.use(VueRouter)

new Vue({
    el: '#app',
    router: vueRouter
})