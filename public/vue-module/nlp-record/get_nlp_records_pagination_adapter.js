export class GetNlpRecordsPagination {
    adapt(models) {

        let item = {
            page: models.page,
            limit: models.limit,
            total: models.total,
            nlp_records: []
        }

        models.nlp_records.map( it => {

            console.log(it)

            item.nlp_records.push({
                id: it.id,
                keyword: it.keyword,
                intent: it.intent,
                story_name: it.story_name,
                updated_at: it.updated_at
            })

        })

        return item
    }
}