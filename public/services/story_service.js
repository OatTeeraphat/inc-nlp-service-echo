class StoryService {
    
    constructor(httpRepository = new HttpRepository()) {
        this.httpRepository = httpRepository
        this.deleteNextStoryID$ = new Subject()
    }

    getStoryStateSubscription(stories) {
        return this.httpRepository.getAllStories().subscribe(
            it => {
                stories.push(...it) 
            }
        )
    }

    deleteStoryByIDSubscription(stories) {
        return this.deleteNextStoryID$
            .pipe(
                switchMap( storyID => this.httpRepository.deleteStoryByID(storyID)
                    .pipe(
                        mapTo(storyID) 
                    )
                )
            )
            .subscribe(
                nextStoryID => stories.splice(stories.findIndex(({id}) => id == nextStoryID), 1)
            )
    }

    deleteNextStoryID(storyID) {
        this.deleteNextStoryID$.next(storyID)
    }
}