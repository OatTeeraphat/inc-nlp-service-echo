// helpers initialize
const helper1 = new SweetAlertAjaxHelper()

// repositories initialize
const repo0 = new HttpRepository()
const repo1 = new CacheStorageRepository()
const repo2 = new SocketRepository()
const repo3 = new LocalStorageRepository()
const repo4 = new CookieRepository(Cookies)

// service initialize
const authService = new AuthenticationService(repo0, helper1, repo4)
const storyService = new StoryService(repo0, helper1)
const webChatService = new WebChatService(repo2)
const nlpRecordsService = new NlpRecordsService(repo0, helper1, repo3)
const nlpTrainingLogService = new NlpTrainingLogService(repo0, helper1)
const nlpReplyCounterService = new NlpReplyCounterService(repo0)


const ifNotAuthenticated = (to, from, next) => {
    let isAuth = repo4.getCustomerSession() !== undefined

    if (!isAuth) {
        next()
        return
    }
    next("/dashboard")
}

const ifAuthenticated = (to, from, next) => {
    let isAuth = repo4.getCustomerSession() !== undefined
    if (isAuth) {
        next()
        return
    }

    next('/login')
}

const routes = [
    { path: '/', name: 'auth',  component: mainPresenter, beforeEnter: ifNotAuthenticated },
    { path: '/login', name: 'login',  component: mainPresenter, beforeEnter: ifNotAuthenticated },
    { path: '/welcome', name: 'welcome',  component: welcomePresenter },
    { path: '/dashboard', name: 'dashboard', component: dashboardPresenter, beforeEnter: ifAuthenticated, meta: { keepAlive: true } },
    { path: '/nlp', name: 'nlp', component: nlpRecordsPresenter, beforeEnter: ifAuthenticated, meta: { keepAlive: true } },
    { path: '/logs', name: 'logs', component: nlpLogPresenter, beforeEnter: ifAuthenticated, meta: { keepAlive: true } },
    { path: '/story', name: 'story', component: storyPresenter, beforeEnter: ifAuthenticated, meta: { keepAlive: true } },
    { path: '/webchat', name: 'webchat', component: webChatPresenter, beforeEnter: ifAuthenticated, meta: { keepAlive: true } },
    // TODO: change to settingPresenter
    { path: '/setting', name: 'setting', component: settingPresenter, beforeEnter: ifAuthenticated, meta: { keepAlive: true } },
    { path: '/logging', name: 'logging', component: logsPresenter, beforeEnter: ifAuthenticated, meta: { keepAlive: true } },

]

const router = new VueRouter({ routes, mode: 'history' });

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
    router
})