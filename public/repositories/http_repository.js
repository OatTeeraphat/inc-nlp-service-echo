const { ajax, AjaxRequest, AjaxResponse, AjaxError, AjaxTimeoutError } = rxjs.ajax

class HttpRepository {

    getAllStories = () => ajax({ method: "GET", url: getHttpHost() + '/v1/story',headers: { "Cache-Control": "max-age=30000" }  })

    deleteStoryByID = (id) => ajax({ method: "DELETE", url: getHttpHost() + '/v1/story?id=' + id })
}