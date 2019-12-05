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

	getDataGrowthInPeriodByAppId(period){
		return this.httpRepository.getDataGrowthInPeriodByAppId(period)
	}

	getCountNlpSetInStoryByAppId(limit){
		return this.httpRepository.getCountNlpSetInStoryByAppId(limit)
	}

	getModelStatInPeriodByAppId(period, confidence) {
		return this.httpRepository.getModelStatInPeriodByAppId(period, confidence)
	}

	getBubbleChart(limit) {
		return this.httpRepository.getBubbleChart(limit)
	}

}