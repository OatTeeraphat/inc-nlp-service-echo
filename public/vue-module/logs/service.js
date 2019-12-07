export class NlpLoggingService {
    constructor(webSocketRepository) {
        this.webSocketRepository = webSocketRepository
        this.$getNlpDashboardLogging = this.webSocketRepository.getNlpDashboardLogging()
    }

    getNlpDashboardLogging() {
        return this.$getNlpDashboardLogging.pipe(
            retryWhen(errors =>
                errors.pipe(
                  tap(err => {
                    console.error('Got error', err);
                  }),
                  delay(1600)
                )
            ),
        )
    }

    nextNlpKeyword() {
        this.$getNlpDashboardLogging.next()
    }

}