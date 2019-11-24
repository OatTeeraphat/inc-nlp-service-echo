var welcomePage = Vue.component('welcome-page', {
    template: `
    <div class="container">
        <div class="row justify-content-center">
            <div v-for="item of nlpCounterDigitSpliter">
                <p class="digit-box" v-bind:key="item">{{ item }}</p>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return this.$welcomePresenter.view
    },
    mounted: function () {
        this.$welcomePresenter.getInitialState()
    },
    computed: {
        nlpCounterDigitSpliter: function () { return this.$welcomePresenter.nlpCounterDigitSpliter() }
    },
    beforeDestroy: function () {
        this.$welcomePresenter.disposal()
    },
})
