export class DashBoardService {

	constructor(httpRepository, vueErrorHandler){
		this.httpRepository = httpRepository
		this.vueErrorHandler = vueErrorHandler
	}

	getAppInfoByClientId() {
		return this.httpRepository.getAppInfoByClientId()
	}

	// getApiCallStat(){

	// }

	// getApiAverageReqTime(){

	// }

}