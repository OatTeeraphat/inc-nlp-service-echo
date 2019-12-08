export class NlpLoggingService {
    constructor(webSocketRepository) {
        this.webSocketRepository = webSocketRepository
    }

    getNlpDashboardLogging() {
        return this.webSocketRepository.getNlpDashboardLogging().pipe(
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

}