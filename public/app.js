const routes = [
    { path: '/', name: 'auth',  component: mainPresenter },
    { path: '/dashboard', name: 'dashboard', component: dashboardPresenter },
    { path: '/nlp', name: 'nlp', component: nlpRecordsPresenter },
    { path: '/logs', name: 'logs', component: nlpLogPresenter },
    { path: '/story', name: 'story', component: storyPresenter },
    { path: '/webchat', name: 'webchat', component: webChatPresenter }
]

// helpers initialize
const helper0 = new CookieHelper()
const helper1 = new SweetAlertAjaxHelper()

// repositories initialize
const repo0 = new HttpRepository(helper0)
const repo1 = new CacheStorageRepository()
const repo2 = new SocketRepository()
const repo3 = new LocalStorageRepository()

Vue.use({

    // The install method will be called with the Vue constructor as the first argument, along with possible options
    install (Vue, options = {}) {
        
        // ES6 way of const job = options.job
        const { } = options
        
        // Add $plugin instance method directly to Vue components
        Vue.prototype.$myInfo = (name, age) => {}

        // Add $surname instance property directly to Vue components
        Vue.prototype.$authService = new AuthenticationService(repo0, helper1)
        Vue.prototype.$nlpRecordsService = new NlpRecordsService(repo0, helper1)
        Vue.prototype.$storyService = new StoryService(repo0, helper1)
        Vue.prototype.$webChatService = new WebChatService(repo2)
    }
})

const router = new VueRouter({ routes, mode: 'history' });

Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
    console.log(to.path)

    if(to.path === '/') {
        next("/dashboard")
    }
    next()
})

new Vue({
    el: '#app',
    router
})