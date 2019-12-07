class SettingViewModel {
	constructor() {
		this.chat_logs = []
		this.is_edit = { confidence: false, app_info: false }
		this.confidence = 0
		this.app_info = {}
		this.app_secret = ""
		this.app_token = ""
		this.debug = { keyword: "", loading: false }
	}
}

class SettingPresenter {
	constructor(settingService) {
		this.view = new SettingViewModel()
		this.settingService = settingService
	}

	getInitialState() {

		this.settingService.getNlpConfidenceByClientId().subscribe(item => {
			this.view.confidence = item.confidence
		})

		this.settingService.getAppInfoByClientId().subscribe(appInfo => {
			// this.view.app_info = appInfo.response
		})

		this.settingService.getAppCredentialByAppId().subscribe(appSecret => {
			console.log(appSecret)
			// const { access_token, client_secret } = appSecret.response
			// this.view.app_secret = `secret ${client_secret}`
			// this.view.app_token = `token ${access_token}`
		})

		this.settingService.setNlpConfidenceByClientID().subscribe()
		this.settingService.setAppInfoByClientId().subscribe()
	}

	onSaveConfidence() {
		this.settingService.nextNlpConfidenceByClientId()
		this.view.is_edit.confidence = false
	}

	onEditConfidence() {
		this.view.is_edit.confidence = true
	}

	onAdjustConfidence(adjust) {
		let newAdjust = this.view.confidence + parseInt(adjust)
		if (newAdjust > 0 && newAdjust < 99) {
			this.view.confidence = newAdjust
		}
	}

	onSaveAppInfo() {
		this.settingService.nextAppInfoByClientId(this.view.app_info)
		this.view.is_edit.app_info = false
	}

	onEditAppInfo($refs) {
		let toggleDelay = of({}).pipe(delay(200))
		toggleDelay.subscribe(() => $refs.focus())
		this.view.is_edit.app_info = true
	}

	onSendNlpKeyword() {
		this.view.debug.loading = true
		let nlpResult = this.settingService.getNlpDebugResult(this.view.debug.keyword)
		nlpResult.subscribe(item => {
			this.view.debug.result = new GetNlpReplyAdapter().adapt(item.response)
			this.view.debug.loading = false
			console.log("success")
		})
	}

	onRevokeAppSecret() {
		this.settingService.setRevokeAppSecret().subscribe(item => {
			console.log("####", item)
			this.view.app_secret = item.client_secret
		})
	}

	onRevokeAppToken() {
		this.settingService.setRevokeAppToken().subscribe(item => {
			this.view.app_token = item.access_token
		})
	}

	getCurrentTime() {
		var d = new Date()
		return d.toISOString()
	}

	disposal() {
		this.view = new SettingViewModel()
	}
}