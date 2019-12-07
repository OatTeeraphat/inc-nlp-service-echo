import { levenshteinDistance } from '../../share-module/utils/distance.js'

export class GetNlpRecordsPagination {
    adapt(models) {

        let item = {
            page: models.page,
            limit: models.limit,
            total: models.total,
            nlp_records: []
        }

        models.nlp_records.map( it => {

            // console.log(it)

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

export class GetSearchByKeywordAndDistancePagination {

    constructor(models) {
        this.models = models
    }

    sortDistance(keyword) {

        let item = {
            page: this.models.page,
            limit: this.models.limit,
            total: this.models.total,
            nlp_records: []
        }

        
        if (this.models.nlp_records === []) {
            item.nlp_records = []
            return item
        }

        this.models.nlp_records.sort( (a,b) => {

            var firstDistance = levenshteinDistance(keyword, a.keyword)

            var secondDistance = levenshteinDistance(keyword, b.keyword)

            if (firstDistance < secondDistance) {
                return -1;
              }
              if (firstDistance > secondDistance) {
                return 1;
              }
              // distance must be equal
              return 0;
        })

        item.nlp_records.push(...this.models.nlp_records)

        return item
    }
}

export class GetStoryModelAdapter extends Array {

    adapt(models) {
        console.log(models)
        models.map(model => {
            this.push({
                id: model.id,
                name: model.name,
            })
        })

        return this
    }

}

export class GetNlpRecordInsertModelAdapter {
    
    adapt(models) {

        models.story_name = models.story_name == "" ? "DEFAULT_STORY" : models.story_name

        return models
    }

}