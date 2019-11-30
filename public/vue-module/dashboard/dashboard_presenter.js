class DashBoardViewModel {
	constructor(){
		this.toggle_chart = { 
			api: "tabFirst", 
			model : "tabFirst", 
			trainig : "tabFirst" 
		}
		this.period = "halfOfMonth"
		this.app_info = {},
		this.api_stat = {
			label : {},
			call : {},
			avg_time : {}
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
			// console.log(item)
			this.view.app_info = item
		})
		
		this.dashBoardService.getApiStatInPeriodByAppId(this.period)
		.subscribe(item => {
			let data = new GetChartApiStat().adapt(item)
			this.view.api_stat.label = data.labels
			this.view.api_stat.call = data.chart.api_call
			this.view.api_stat.avg_time = data.chart.avg_time
			// console.log(data)
		})

	}

	onSelectPeriod(){

	}

}