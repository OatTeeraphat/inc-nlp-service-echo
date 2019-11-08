class GetCustomerSignInAdapter {
    adapt(model) {
        return {
            username: model.username,
            token: model.token,
            expired: model.expired
        }
    }
}