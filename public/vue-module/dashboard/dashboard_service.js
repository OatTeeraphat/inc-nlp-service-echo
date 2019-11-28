export class DashBoardService {

	constructor(httpRepository, vueErrorHandler){
		this.httpRepository = httpRepository
		this.vueErrorHandler = vueErrorHandler
	}

	getAppInfoByClientId() {
		return this.httpRepository.getAppInfoByClientId()
	}

	getApiStatInPeriodByAppId(period){
		return this.httpRepository.getApiStatInPeriodByAppId(period)
	}



}