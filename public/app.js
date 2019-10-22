var routes = [
    { path: '/', component: mainPresenter },
    { path: '/nlp', name: 'nlp', component: nlpRecordsPresenter },
    { path: '/logs', name: 'logs', component: nlpLogPresenter },
    { path: '/story', name: 'story', component: storyPresenter },
    { path: '/webchat', name: 'webchat', component: webChatPresenter }
]
  
var router = new VueRouter({
    // mode: 'history',
    routes
});

Vue.use(VueRouter)

new Vue({
    el: '#app',
    router
})