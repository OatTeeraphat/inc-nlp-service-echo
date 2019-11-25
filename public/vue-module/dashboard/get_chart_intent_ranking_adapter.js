export class GetChartIntentRankingAdapter {
    adapt(models) {

        let item = {
            label : models.story_name,
            datasets : []
        }

        models.data.map( it => {
            item.data.push({
                intent: it.intent,
                calls: it.calls,
                story_name: it.story_name
            })
        })

        return item
        
    }
}