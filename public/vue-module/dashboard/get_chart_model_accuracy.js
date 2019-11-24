/*
  Definition of specific
  label : transaction or slove
  datasets : array of amount_of_slove by type(Transaction|Slove)
*/

class GetChartModelAccuracyAdapter {
  adapt(models) {

      let item = {
        label : models.type,
        datasets  : []
      }

      models.data.map( it => {
          item.data.push({
            label : it.type,
            data : it.amount_of_slove
          })
      })

      return item

  }
}

