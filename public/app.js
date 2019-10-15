var routes = [
    { path: '/', component: mainPresenter },
    { path: '/nlp', name: 'nlp', component: nlpPresenter },
    { path: '/story', name: 'story', component: storyPresenter },
    { path: '/webchat', name: 'web-chat-component', component: webChatPresenter }
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