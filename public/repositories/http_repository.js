const { ajax, AjaxRequest, AjaxResponse, AjaxError, AjaxTimeoutError } = rxjs.ajax

class HttpRepository {

    getAllStories = () => ajax({ method: "GET", url: getHttpHost() + '/v1/story' })

    deleteStoryByID = (id) => ajax({ method: "DELETE", url: getHttpHost() + '/v1/story?id=' + id })
}