class StoryService {
    constructor(httpRepository = new HttpRepository()) {
        this.httpRepository = httpRepository
    }
    
    getMockShop() {
        return this.httpRepository.getShopStoryAPI()
    }
}