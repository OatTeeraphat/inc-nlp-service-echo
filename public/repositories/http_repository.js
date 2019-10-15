const { ajax } = rxjs.ajax

class HttpRepository {

    getShopStoryAPI = () => {
        return ajax({ url: getHost() + '/v1/nlp' })
    }
}