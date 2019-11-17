class GetClientSignInAdapter {
    adapt(model) {

        return {
            consumer_id: model.consumer_id,
            username: model.username,
            email: model.email,
            access_token: model.access_token,
            refresh_token: model.refresh_token,
            expires_in: model.expires_in,

        }
    }
}