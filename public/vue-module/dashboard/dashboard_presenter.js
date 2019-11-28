class DashBoardViewModel {
	constructor(){
		this.toggle_chart = { 
			api: "tabFirst", 
			model : "tabFirst", 
			trainig : "tabFirst" 
		}
		this.period = "halfOfMonth"
		this.app_info = {}
	}

}

export class DashBoardPresenter {

	constructor(dashBoardService){
		this.view = new DashBoardViewModel()
		this.dashBoardService = dashBoardService
	}

	getInitialState(){
		
		this.dashBoardService.getAppInfoByClientId().subscribe(item => {
			console.log(item)
			this.view.app_info = item
		})
		
		this.dashBoardService.getApiStatInPeriodByAppId(this.period).subscribe(item => {
			let data = new GetChartApiStat().adapt(item)
			console.log(data)
		})

	}

	onSelectPeriod(){

	}

}