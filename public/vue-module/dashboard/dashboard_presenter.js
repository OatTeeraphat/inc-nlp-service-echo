class DashBoardViewModel {
	constructor(){
		this.toggle_chart = { 
			api: "tabFirst", 
			model : "tabFirst", 
			trainig : "tabFirst" 
		}
		this.period = "halfOfMonth",
		this.stack_limit = 10,
		this.current_confidence = 50,
		this.app_info = {},
		this.api_stat = {
			label : [],
			call : {},
			avg_time : {}
		}
		this.training_stat = {
			label : [],
			amount : {},
			stacks : {}
		}
		this.model_stat = {
			label : [],
			amount: {
				slove_amount: {},
				transaction_amount: {},
			},
			ratio : 0,
			confidence: this.current_confidence
		}
		this.bubble_chart = {
			data : {}
		}
	}

}

export class DashBoardPresenter {

	constructor(dashBoardService){
		this.view = new DashBoardViewModel()
		this.dashBoardService = dashBoardService
	}

	getInitialState(){
		this.dashBoardService.getAppInfoByClientId().subscribe(item => {
			// FIXME: change to response ajax
			// this.view.app_info = item.response

			this.view.app_info = {
				name: "incommon studio"
			}
		})
		
		this.dashBoardService.getApiStatInPeriodByAppId(this.period)
		.subscribe(item => {
			let data = new GetChartApiStat().adapt(item)
			this.view.api_stat.label = data.labels
			this.view.api_stat.call = data.chart.api_call
			this.view.api_stat.avg_time = data.chart.avg_time
			// console.log(data)
		})

		this.dashBoardService.getDataGrowthInPeriodByAppId(this.period)
		.subscribe(item => {
			console.log(item)
			let data = new GetChartTrainingStat().adapt(item)
			this.view.training_stat.label = data.labels
			this.view.training_stat.amount = data.amount
		})

		this.dashBoardService.getCountNlpSetInStoryByAppId(this.stack_limit)
		.subscribe(item => {
			console.log(item)
			let data = new GetChartTrainingSummary().adapt(item)
			this.view.training_stat.stacks = data.stacks
		})

		this.dashBoardService.getModelStatInPeriodByAppId(this.period, this.view.model_stat.confidence)
		.subscribe(item => {
			let data = new GetChartModelStat().adapt(item)
			this.view.model_stat.label = data.labels
			this.view.model_stat.amount.slove_amount = data.slove_amount
			this.view.model_stat.amount.transaction_amount = data.transaction_amount
			this.view.model_stat.ratio = data.ratio
		})

		this.dashBoardService.getBubbleChart(this.limit)
		.subscribe(item => {
			let data = new GetChartTopIntent().adapt(item)
			this.view.bubble_chart.data = data.intents
			console.log(data.intents[0].data)
		})

	}

	// onSelectPeriod(){

	// }

}