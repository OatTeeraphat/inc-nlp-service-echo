class SettingService {

	constructor(httpRepository, vueErrorHandler) {
		this.httpRepository = httpRepository
		this.vueErrorHandler = vueErrorHandler
		this.setConfidence$$ = new Subject()
		this.setClient$$ = new Subject()
		this.setAppSecret$$ = new Subject()
		this.setAppToken$$ = new Subject()

		
	}

	getNlpConfidenceByClientId() {
		return this.httpRepository.getNlpConfidenceByClientID()
	}

	setNlpConfidenceByClientID() {
		return this.setConfidence$$.pipe(
			switchMap(({ confidence }) => {
				return this.httpRepository.setNlpConfidenceByClientID(confidence).pipe(
					this.vueErrorHandler.catchHttpError()
				)
			}),
			map(next => {
				swal("resolve", { icon: "success", timer: this.duration })
			}),
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
				return this.httpRepository.setAppInfoByClientId(info).pipe(
					this.vueErrorHandler.catchHttpError()
				)
			}),
			map(next => {
				swal("resolve", { icon: "success", timer: this.duration })
			}),
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

	getAppCredentialByAppId(app_id) {
		return this.httpRepository.getAppCredentialByAppId(app_id).pipe(
			this.vueErrorHandler.catchHttpError()
		)
	}


	setRevokeAppSecret(){
		return this.setAppSecret$$.pipe(
			switchMap( () => {
				return this.httpRepository.revokeSecretByAppId().pipe(
					this.vueErrorHandler.catchHttpError()
				)
			}),
			map(next => {
				swal("resolve", { icon: "success", timer: this.duration })
				return next
			}),
		)
	}

	
	nextRevokeAppSecret() {
		return this.setAppSecret$$.next({})
	}


	setRevokeAppToken() {
		return this.setAppToken$$.pipe(
			switchMap(() => {
				return this.httpRepository.revokeAccessTokenByAppId().pipe(
					this.vueErrorHandler.catchHttpError()
				)
			}),
			map(next => {
				swal("resolve", { icon: "success", timer: this.duration })
				return next
			}),
		)
	}

	nextRevokeAppToken() {
		return this.setAppToken$$.next({})
	}


	getNlpDebugResult(keyword){
		return this.httpRepository.getNlpRecordsByKeyword(keyword)
	}
}

