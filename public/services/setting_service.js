class SettingService {

	constructor(httpRepository, vueErrorHandler) {
		this.httpRepository = httpRepository
		this.vueErrorHandler = vueErrorHandler
		this.setConfidence$$ = new Subject()
		this.setClient$$ = new Subject
		
	}

	getNlpConfidenceByClientId() {
		return this.httpRepository.getNlpConfidenceByClientID()
	}

	setNlpConfidenceByClientID() {
		return this.setConfidence$$.pipe(
			switchMap(({ confidence }) => {
				return this.httpRepository.setNlpConfidenceByClientID(confidence)
			}),
			map(next => {
				swal("resolve", { icon: "success", timer: this.duration })
			}),
			this.vueErrorHandler.catchError()
		)
	}

	nextNlpConfidenceByClientId() {
		this.setConfidence$$.next({})
	}


	getAppInfoByClientId() {
		return this.httpRepository.getAppInfoByClientId()
	}

	setAppInfoByClientId() {
		return this.setClient$$.pipe(
			switchMap(({ info }) => {
				return this.httpRepository.setAppInfoByClientId(info)
			}),
			map(next => {
				swal("resolve", { icon: "success", timer: this.duration })
			}),
			this.vueErrorHandler.catchError()
		)
	}


	nextAppInfoByClientId(){
		this.setClient$$.next({})
	}

	editAppInfo() {
		this.setClient$$.pipe(
			delay(200),
			switchMap(({ event }) => {
				return of(event)
			})
		)
	}


	



}