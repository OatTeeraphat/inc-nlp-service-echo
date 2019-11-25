export class GetChartIntentRatioAdapter {
    adapt(models) {

        let item = {
            label : model.story_name,
            data: [],
        }

        models.data.map( it => {
            item.data.push( it.percentage )
        })

        return item

    }
}