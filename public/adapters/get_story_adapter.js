class GetStoryModelAdapter extends Array {

    adapt(models) {

        models.map( model => {
            this.push({
                id: model.id,
                name: model.name,
                desc: model.desc,
                owner: model.owner,
                create_at: model.create_at,
                updated_at: model.updated_at,
            })
        })

        return this
    }

}