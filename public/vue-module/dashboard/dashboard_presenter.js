class DashBoardViewModel {
	constructor(){
		this.toggle_chart = { 
			api: "tabFirst", 
			model : "tabFirst", 
			trainig : "tabFirst" 
		}
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
		
		

	}

	onSelectPeriod(){

	}

}