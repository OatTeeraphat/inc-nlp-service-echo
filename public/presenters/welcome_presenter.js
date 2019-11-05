var welcomePresenter = Vue.component('welcome-presenter', {
    template: `
    <div class="container">
            <p> {{ this.counter }} </p>
    </div>
    `,
    mounted: function () {
        interval(600).subscribe(it => {
            this.counter = it + 1
        })
    },
    data: function() {
        return {
            counter: 0
        }
    }
})
