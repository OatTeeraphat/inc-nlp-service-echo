class GetClientSignInAdapter {
    adapt(model) {

        return {
            client_id: model.client_id,
            client_secret: model.client_secret,
            email: model.email,
            access_token: model.access_token,
            // refresh_token: model.refresh_token,
            expires_in: model.expired_date,

        }
    }
}