export const apiDocumentPage = Vue.component('api-document-page', {    
    template: `
    <div class="warp" >
        
        <div v-html="compiledMarkdown"></div>
        <textarea :value="input" @input="update"></textarea>
    </div>
    `,
    data: function () {
        return {
            input: '# API Document'
        }
    },
    mounted: function () {

    },
    computed: {
        compiledMarkdown: function () {
          return marked(this.input, { sanitize: true })
        }
      },
    beforeDestroy: function () {
    },
    methods: {
        update: function (e) {
            this.input = e.target.value
        }
    }
})