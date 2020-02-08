export class GetStoryModelAdapter extends Array {

    adapt(models) {
        console.log(models)
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

export class GetPaginationNlpRecordByStoryIDs extends Array {

    adapt(models) {
        console.log('models', models)

        models.nlp_record.map( model => {
            this.push({
                id: model.id,
                keyword: model.keyword,
                intent: model.intent,
                story: "GREETING",
                updated_at: model.updated_at
            })
        })

        return {
            page: models.page,
            limit: models.limit,
            total: models.total,
            nlp_record: this
        }
    }

}