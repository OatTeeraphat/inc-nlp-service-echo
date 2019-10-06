
const { WebSocketSubject } = rxjs.webSocket;

let socket$ = new WebSocketSubject({url: 'ws://localhost:9000/v1/fb/webhook/socket.io'});


var app4 = new Vue({
    el: '#app-4',
    methods: {
        onSendNlpKeyword: function() {
            console.log(event)
            socket$.next(this.keyword_input) 
        },
    },
    created: function() {
        socket$.subscribe(
            (msg) => {
                console.info(msg)
                this.keyword = msg.keyword
                this.intent = msg.intent
                this.distance = msg.distance
            },
            (err) => console.error(err),
            () => console.log('complete')
        ) 
    },
    data: {
        keyword_input: "",
        keyword: "keyword",
        intent: "intent",
        distance: 0,
    }
})

app4.$watch