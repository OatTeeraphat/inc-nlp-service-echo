class GetChartBubbleIntentAdapter {
    adapt(item) {

        let item = {
            intent : item.intent,
            calls : item.calls,
            story : item.story
        }
        return item
    }
}


                  