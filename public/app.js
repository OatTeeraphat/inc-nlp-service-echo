var NLP = {
	template: "<div><h1>NLP</h1><p>This is home page</p></div>"
};

var Story = {
	template: "<div><h1>Story</h1><p>This is home page</p></div>"
};

var Home = {
	template: "<div><h1>Home</h1><p>This is home page</p></div>"
};

Vue.use(VueRouter)

var routes = [
    { path: '/', component: Home },
    { path: '/nlp', name: 'nlp', component: NLP },
    { path: '/story', name: 'story', component: Story },
    { path: '/webchat', name: 'web-chat-component', component: webChatComponent }
]
  
var router = new VueRouter({
    // mode: 'history',
    routes
});
  
new Vue({
    el: '#app',
    router
})