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
        return {
            // type can be BY_FILL_FEEL or BY_CLIENT_ID
            isFlip: false,
            type: "BY_FILL_FEEL",
            initialNlpCounter: 0,
        }
    },
    mounted: function () {
        this.$nlpReplyCounterService.getNlpReplyCounter().subscribe( it => {
            this.initialNlpCounter = this.initialNlpCounter + it.reply_count 
        })
    },
    computed: {
        nlpCounterDigitSpliter: function(e) {
            return (""+ this.initialNlpCounter ).split("")
        }
    },
    beforeDestroy: function () {
        this.$nlpReplyCounterService.disposable()
    },
})
