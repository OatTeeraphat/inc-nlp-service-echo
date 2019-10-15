const { ajax } = rxjs.ajax

class HttpRepository {

    getAllStories = () => ajax({ method: "GET", url: getHttpHost() + '/v1/story' }).pipe( 
        map( json => new GetStoryModelAdapter().adapt(json.response) )
    )

    deleteStoryByID = (id) => ajax({ method: "DELETE", url: getHttpHost() + '/v1/story?id=' + id })

}