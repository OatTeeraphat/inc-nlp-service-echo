export class GetNlpTrainingLogPaginationAdapter {
    adapt(models) {
        
        let item = {
            page: models.page,
            limit: models.limit,
            total: models.total,
            nlp_logs: []
        }

        models.nlp_logs.map( it => {

            item.nlp_logs.push({
                id: it.id,
                keyword: it.keyword,
                intent: it.intent,
                story_name: it.story_name,
                distance: it.distance
            })

        })

        return item
    }
}