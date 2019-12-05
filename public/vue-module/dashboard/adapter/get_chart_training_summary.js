/*
  Definition of specific
  date_start : start date [timestamp]
  date_end : end date [timestamp]
  data : training set created date [timestamp]
  y : count of training set must be created in same date [int]
*/

class GetChartTrainingSummary {

	adapt(models) {

		let item = {
			stacks : []
		}


		models.map((it) => {

			let summary = this.convertAmountToChartData(models)
			let percentage = ((it.amount / summary) * 100)

			item.stacks.push({
				label: it.story_name,
				data: [parseFloat(percentage.toFixed(2)) ],
				percentage: parseFloat(percentage.toFixed(2)),
				amount: it.amount,
				backgroundColor: colorByStory[it.story_name] ? colorByStory[it.story_name] : '#aaaaaa'
			})


		})

		//console.log(item)
		
		return item

	}

	/*
		rule : start end of range or first of month need array of date and month str
		return array()
	*/

	convertAmountToChartData = (models) => {

		let sumOfAmount = 0

		models.map((it) => {
			sumOfAmount = it.amount + sumOfAmount
		})

		return sumOfAmount

	}

	
}

/*

  Example Income
   	[
		{ story_name: "GREETING", amount: 150 },
		....
	]
  Example Outcome
  	{
		stacks :[
			{ label: "GREETING", data: [5.38], percentage: 12.5, amount: "150", backgroundColor : "#673AB7" },
			...
		]
	}
*/