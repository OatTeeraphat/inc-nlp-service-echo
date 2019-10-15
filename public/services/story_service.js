class StoryService {
    
    constructor(httpRepository = new HttpRepository()) {
        this.httpRepository = httpRepository
    }

    getStoryStateSubscription(stories) {
        return this.httpRepository.getAllStories().subscribe(
            it => {
                stories.push(...it) 
            }
        )
    }

    removeStoryStateByID(storyID) {
        return this.httpRepository.deleteStoryByID(storyID)
    }
}