export class GetClientSignInAdapter {
    adapt(model) {

        return {
            consumer_id: model.consumer_id,
            client_id: model.client_id,
            client_secret: model.client_secret,
            email: model.email,
            access_token: model.access_token,
            // refresh_token: model.refresh_token,
            expires_in: model.expired_date,

        }
    }
}