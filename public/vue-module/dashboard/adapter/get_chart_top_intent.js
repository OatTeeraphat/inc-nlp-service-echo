/*
  Definition of specific
  date_start : start date [timestamp]
  date_end : end date [timestamp]
  data : training set created date [timestamp]
  y : count of training set must be created in same date [int]
*/

class GetChartTopIntent {

	adapt(models) {

		let item = {
			intents : []
		}

		models.map((it) => {

			let _model = {
			  label: it.label,
			  backgroundColor: colorByStory[it.label],
              pointBackgroundColor: 'white', //need props to replace value in vue-chartjs
              borderWidth: 1,
			  pointBorderColor: colorByStory[it.label] ,
              data: []
			}

			it.data.map((_data) => {

				_model.data.push({
					x: 65, y: 75, r: parseInt(_data.call)/10 , intent: _data.intent, calls: _data.call , story_name: it.label
				})

			})

			item.intents.push(_model)


		})

		console.log(item)
		
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

	calculateRadius = (models) => {

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
		label: 'GREETING',
		data : [
			{ intent: "สวัสดีจ้า", call: "1,938" },
			......
		....
	]
  Example Outcome
  	{
		intents :[
			{
              label: 'GREETING',
              backgroundColor: colorByStory.GREETING ,
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: colorByStory.GREETING ,
              data: [
                { x: 65, y: 75, r: 80, intent : "สวัสดีจ้า", calls : "1,938", story_name : "GREETING" },
                { x: 90, y: 38, r: 45, intent : "หิวมั้ย", calls : "1,038", story_name : "GREETING" }
              ]
            }
			...
		]
	}
*/