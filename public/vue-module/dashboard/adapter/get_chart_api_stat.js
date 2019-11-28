/*
  Definition of specific
  date_start : start date [timestamp]
  date_end : end date [timestamp]
  data : training set created date [timestamp]
  y : count of training set must be created in same date [int]
*/

class GetChartApiStat {

	adapt(models) {

		let item = {
			labels : [],
			chart : {
				api_call : [],
				avg_time : []
			}
		}

		models.map((it, key) => {
			
			item.labels.push(
				this.convertDateToChartLabel(it.time, key, models)
			)

			item.chart.api_call.push({
				y : it.call,
				date: new Date(it.time).toDateString()
			})

			item.chart.avg_time.push({
				y: it.avg_time,
				date: new Date(it.time).toDateString()
			})

		})

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
		{ timestamp: "2019-11-01 00:00:00.00+00", call: "0", avg_time : "0" },
		....
	]
  Example Outcome
  	{
		labels: [['June', '1'], '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', ['June', '12']]
		chart : {
			api_call :[
				{ y: 0, date: "Sunday, June 1, 2019" },
				...
			],
			avg_time : [
				{ y: 0, date: "Sunday, June 1, 2019" },
			]
		}
	}
*/