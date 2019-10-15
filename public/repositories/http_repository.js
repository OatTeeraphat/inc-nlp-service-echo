const { ajax } = rxjs.ajax

class HttpRepository {

    getShopStoryAPI = () => {
        return ajax({ url: getHttpHost() + '/v1/nlp' })
    }
}