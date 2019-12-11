export class GetStoryModelAdapter extends Array {

    adapt(models) {
        models.map( model => {
            this.push({
                id: model.id,
                name: model.name,
                desc: model.desc,
                count_intent: model.count_intent,
                updated_at: model.updated_at,
                is_edit : false
            })
        })

        return this
    }

}