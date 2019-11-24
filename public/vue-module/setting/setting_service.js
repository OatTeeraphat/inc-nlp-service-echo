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
				return this.httpRepository.setNlpConfidenceByClientID(confidence)
			}),
			map(next => {
				swal2("success", { title: 'Save Confidence', toast: true })
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
				swal2("success", { title: 'Save App Info', toast: true })
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

	getAppCredentialByAppId(app_id) {
		return this.httpRepository.getAppCredentialByAppId(app_id)
	}


	setRevokeAppSecret(){
		let alertBox = swal2("warning", { title: "Revoke App Secret?", html: 'your old app secret will be depecate <br> New secret can be used now.' }, true);
		return from( alertBox )
			.pipe(
				switchMap( it => {
				if ( it.value ) return this.httpRepository.revokeSecretByAppId()
					return of()
				}),
				map(next => {
					swal2("success", { title: 'Revoke App Secret', toast: true })
				}),
			)

	}

	setRevokeAppToken() {
		let alertBox = swal2("warning", { title: "Revoke Access Token?", html: 'your old app access token will be depecate <br> New token can be used after confirm.' }, true);
		return from( alertBox )
			.pipe(
				switchMap(it => {
				if (it.value) return this.httpRepository.revokeAccessTokenByAppId()
					return of()
				}),
				map(next => {
					swal2("success", { title: 'Revoke Access Token', toast: true })
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

