class GetChartStackIntentAdapter {
    adapt(models) {

        let item = {
            label : models.label,
            data : []
        }

        models.data.map( it => {
            item.data.push( it.data )
        })

        return item
    }
}