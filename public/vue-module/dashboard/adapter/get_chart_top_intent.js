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
		let cons = 1
		let width = 50

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

				let radius = this.calculateRadius(_data.call, width, cons)
				let xAxe = this.calculateRandom(100, radius)
				let yAxe = this.calculateRandom(100, radius)

				_model.data.push({
					x: xAxe, y: yAxe, r: radius , intent: _data.intent, calls: _data.call , story_name: it.label
				})

			})

			item.intents.push(_model)

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

	calculateRadius = (value, width, cons) => {

		let base = 0;

		switch (true) {
			case value > 1000:
				base = Math.abs(value) / 15;
				break;
			case value > 500:
				base = Math.abs(value) / 10;
				break;
			case value > 100:
				base = Math.abs(value) / 6;
				break;
			case value > 50:
				base = Math.abs(value) / 7;
				break;
			case value > 5:
				base = Math.abs(value);
				break;
			default:
				base = Math.abs(value) * 2;
				break;
		}

		return ( width / 100 ) * base; 

	}

	calculateRandom = (max, radius) => {
		return Math.floor(Math.random() * (max - (radius/2))) + 1
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