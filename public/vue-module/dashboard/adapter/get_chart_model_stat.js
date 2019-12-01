/*
  Definition of specific
  date_start : start date [timestamp]
  date_end : end date [timestamp]
  data : training set created date [timestamp]
  y : count of training set must be created in same date [int]
*/

class GetChartModelStat {

	adapt(models) {
		
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

		item.ratio = this.calculateCanBeSloveRatio(models)

		console.log(item)

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

	calculateCanBeSloveRatio = (models) => {

		let sumOfAmount = 0
		let sumOfSlove = 0

		models.map((it) => {
			sumOfAmount = parseInt(it.amount) + sumOfAmount
			sumOfSlove = parseInt(it.slove) + sumOfSlove
		})

		let CanBeSloveRatio = (sumOfSlove / sumOfAmount) * 100

		return CanBeSloveRatio.toFixed(2)

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