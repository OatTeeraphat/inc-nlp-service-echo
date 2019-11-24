/*
  Definition of specific
  date_start : start date [timestamp]
  date_end : end date [timestamp]
  data : training set created date [timestamp]
  y : count of training set must be created in same date [int]

*/

class GetChartIntentGrowth {
  adapt(models) {

    let item =  {
          date_start : models.date_start,
          date_end  : models.date_end,
          data : []
    }

    model.data.map(it => {
        item.data.push({
          y : it.count,
          date : it.create_at
        })
    })

  }
}