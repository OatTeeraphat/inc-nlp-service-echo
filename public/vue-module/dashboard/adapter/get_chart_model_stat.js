/*
  Definition of specific
  date_start : start date [timestamp]
  date_end : end date [timestamp]
  data : training set created date [timestamp]
  y : count of training set must be created in same date [int]
*/

class GetChartModelStat {

	adapt(models) {
		console.log(models)
		let item = {
			labels: [],
			slove_amount: [],
			transaction_amount: [],
			ratio: 0
		}

		models.map((it, key) => {
			
			item.labels.push(
				this.convertDateToChartLabel(it.time, key, models)
			)

			item.slove_amount.push(it.slove)
			item.transaction_amount.push(it.amount)

			

		})

		console.log(models)
		return item

	}

	/*
		rule : start end of range or first of month need array of date and month str
		return array()
	*/

	convertDateToChartLabel = (time, k, models) => {

		let txtMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

		let date = new Date(time).getDate()
		let month = new Date(time).getMonth()

		let rule = Boolean(k == 0 || k == (models.length - 1) || date == 1)

		return rule ? [txtMonth[month], date] : date 

	}
}

/*

  Example Income
   	[
		{ time: "2019-11-01 00:00:00.00+00", amount: "0" },
		....
	]
  Example Outcome
  	{
		labels: [['June', '1'], '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', ['June', '12']]
		amount :[
			{ y: 0, date: "Sunday, June 1, 2019" },
			...
		]
	}
*/