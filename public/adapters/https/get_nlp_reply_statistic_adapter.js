class GetNlpReplyStatisticAdapter {
    adapt(model) {
        return {
            reply_count: model.reply_count
        }
    }
}