export class GetNlpReplyAdapter {
    adapt(item) {
        return {
            keyword: item.keyword,
            intent: item.intent,
            distance: item.distance
        }
    }
}

export class GetNlpChatLogsAdapter {
    adapt(item) {
        return {
            keyword: item.keyword,
            intent: item.intent,
        }
    }
}