(async () => console.log(`######### FillChat #########`) )()
import { CookieRepository } from './share-module/repositories/cookie_repository.js'
import { HttpRepository } from './share-module/repositories/http_repository.js'
import { SocketRepository } from './share-module/repositories/socket_repository.js'
import { LocalStorageRepository } from './share-module/repositories/local_storage_repository.js'
import { CacheStorageRepository } from './share-module/repositories/cache_storage_repository.js'
import { AuthGuard } from './share-module/security/vue_auth_guard.js'
import { VueErrorHandler } from './share-module/middleware/vue_error_handle.js'

// Auth module
import { AuthenticationService } from './vue-module/authentication/service.js'
import { AuthenticationPresenter } from './vue-module/authentication/presenter.js'
import mainPage from './vue-module/authentication/page.js'

// NLP training record module
import { NlpRecordsService } from './vue-module/nlp-record/service.js'
import { NlpRecordPresenter } from './vue-module/nlp-record/presenter.js'
import { NlpTrainingLogService } from './vue-module/nlp-training-log/service.js'
import { NlpTrainingLogPresenter } from './vue-module/nlp-training-log/presenter.js'
import { StoryService } from './vue-module/story/service.js'
import { StoryPresenter } from './vue-module/story/presenter.js'
import { WebChatService } from './vue-module/webchat/webchat_service.js'
import { NlpReplyCounterService } from './vue-module/welcome/services/nlp_reply_counter_service.js'
import { WelcomePresenter } from './vue-module/welcome/presenter.js'
import { DashBoardService } from './vue-module/dashboard/dashboard_service.js'
import { DashBoardPresenter } from './vue-module/dashboard/dashboard_presenter.js'

import nlpRecordPage from './vue-module/nlp-record/page.js'
import nlpTrainingLog from './vue-module/nlp-training-log/page.js'
import storyPage from './vue-module/story/page.js'
import welcomePage from './vue-module/welcome/page.js'
import dashboardPage from './vue-module/dashboard/dashboard_page.js'
import webChatPage from './vue-module/webchat/webchat_page.js'
import accessLogPage from './vue-module/logs/page.js'

// TODO: Setting Module


import './vue-custom-module/navbar/nav_component.js'
import './vue-custom-module/chart/chart_bubble_intent_component.js'
import './vue-custom-module/chart/chart_model_accuracy_component.js'
import './vue-custom-module/chart/chart_stack_training_component.js'
import './vue-custom-module/chart/chart_training_growth_component.js'
import './vue-custom-module/chart/chart_usage_api_component.js'
import './vue-custom-module/chart/chart_usage_average_time_component.js'


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
    { path: '/nlp', name: 'nlp', component: nlpRecordPage, beforeEnter: authGuard.ifAuthenticated },
    { path: '/logs', name: 'logs', component: nlpTrainingLog , beforeEnter: authGuard.ifAuthenticated },
    { path: '/story', name: 'story', component: storyPage , beforeEnter: authGuard.ifAuthenticated },
    { path: '/webchat', name: 'webchat', component: webChatPage, beforeEnter: authGuard.ifAuthenticated },
    { path: '/setting', name: 'setting', component: settingPage, beforeEnter: authGuard.ifAuthenticated },
    { path: '/logging', name: 'logging', component: accessLogPage , beforeEnter: authGuard.ifAuthenticated },
]

// vue Router
const vueRouter = new VueRouter({ routes, mode: 'history' });

// error handle initialize
const vueErrorHandler = new VueErrorHandler(cookieRepo, vueRouter)

// service initialize
const authService = new AuthenticationService(httpRepo, vueRouter, cookieRepo, vueErrorHandler)
const storyService = new StoryService(httpRepo, vueRouter, cookieRepo, vueErrorHandler)
const nlpRecordsService = new NlpRecordsService(httpRepo, vueRouter, localStorageRepo, cookieRepo, vueErrorHandler)
const nlpTrainingLogService = new NlpTrainingLogService(httpRepo, vueRouter, cookieRepo, vueErrorHandler)
const nlpReplyCounterService = new NlpReplyCounterService(httpRepo, vueErrorHandler)
const settingService = new SettingService(httpRepo, vueErrorHandler)
const dashBoardService = new DashBoardService(httpRepo, vueErrorHandler)

// presenter initialize
const authPresenter = new AuthenticationPresenter(authService)
const welcomePresenter = new WelcomePresenter(nlpReplyCounterService)
const storyPresenter = new StoryPresenter(storyService)
const nlpTrainingLogPresenter = new NlpTrainingLogPresenter(nlpTrainingLogService)
const nlpRecordPresenter = new NlpRecordPresenter(nlpRecordsService)
const settingPresenter = new SettingPresenter(settingService)
const dashboardPresenter = new DashBoardPresenter(dashBoardService)

Vue.use({
    // The install method will be called with the Vue constructor as the first argument, along with possible options
    install (Vue) {

        Vue.prototype.$authPresenter = authPresenter
        Vue.prototype.$welcomePresenter = welcomePresenter
        Vue.prototype.$storyPresenter = storyPresenter
        Vue.prototype.$nlpTrainingLogPresenter = nlpTrainingLogPresenter
        Vue.prototype.$nlpRecordPresenter = nlpRecordPresenter
        Vue.prototype.$settingPresenter = settingPresenter
        Vue.prototype.$dashboardPresenter = dashboardPresenter

        // FIXME:  webchat error
        // Vue.prototype.$webChatService = webChatService
            
    }
})

Vue.use(VueRouter)

new Vue({
    el: '#app',
    router: vueRouter,
    component: {
        // navComponent
    }
})


const Colors = Object.freeze({
    RED:   Symbol("red"),
    BLUE:  Symbol("blue"),
    GREEN: Symbol("green")
});