const routes = [
    { path: '/', component: mainPresenter },
    { path: '/dashboard', name: 'dashboard', component: dashboardPresenter },
    { path: '/nlp', name: 'nlp', component: nlpRecordsPresenter },
    { path: '/logs', name: 'logs', component: nlpLogPresenter },
    { path: '/story', name: 'story', component: storyPresenter },
    { path: '/webchat', name: 'webchat', component: webChatPresenter }
]

const router = new VueRouter({ routes });

const repo0 = new HttpRepository()
const repo1 = new SweetAlertAjaxWrapper()
const repo2 = new SocketRepository()

Vue.use({

    // The install method will be called with the Vue constructor as the first argument, along with possible options
    install (Vue, options = {}) {
        
      // ES6 way of const job = options.job
      const { } = options
      
      // Add $plugin instance method directly to Vue components
      Vue.prototype.$myInfo = (name, age) => {}
        
      // Add $surname instance property directly to Vue components
      Vue.prototype.$authService = new AuthenticationService(repo0, repo1)
      Vue.prototype.$nlpRecordsService = new NlpRecordsService(repo0, repo1)
      Vue.prototype.$storyService = new StoryService(repo0, repo1)
      Vue.prototype.$webChatService = new WebChatService(repo2)
    }
})

Vue.use(VueRouter)

new Vue({
    el: '#app',
    router
})