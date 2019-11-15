
class StoryService {
    
    constructor( httpRepository, vueRouter, cookieRepository) {
        this.vueRouter = vueRouter
        this.httpRepository = httpRepository
        this.cookieRepository = cookieRepository
        this.unsubscribe = new Subject()
    }

    getStoryState() {
        let getAllStoriesEvent$ = this.httpRepository.getAllStories()

        return this.httpRepository.getAllStories().pipe(
            takeUntil(this.unsubscribe),
            switchMap( ({ response }) => {
                return of(new GetStoryModelAdapter().adapt(response))
            }),
            catchError( e => {

                if (e.status == 401) {
                    swal({ text: "ไม่มีสิทธิ์เข้าถึงการใช้งาน", icon: "error", timer: 1600 })
                    this.cookieRepository.removeCustomerSession()
                    this.vueRouter.push('/')
                }

                if (e.status == 500) {
                    swal({ text: "เซิฟเวอร์ผิดพลาด", icon: "error", timer: 1600 })
                }

                return throwError(e)
            })
        )

    }

    deleteStoryByID(storyID) {

        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
            switchMap( SWAL_CONFIRM => {
                console.debug(SWAL_CONFIRM)

                if (SWAL_CONFIRM) return this.httpRepository.deleteStoryByID(storyID)

                const SWAL_CANCEL = false

                return throwError("SWAL_CANCEL")
            }),
            map( next => {
                swal("resolve", {icon: "success", timer: this.duration}) 
            }),
            catchError( e  => {

                if (e.status == 401) {
                    this.cookieRepository.removeCustomerSession()
                    this.vueRouter.push('/')
                    swal({ text: "ไม่มีสิทธิ์เข้าถึงการใช้งาน", icon: "error", timer: 1600 })
                }

                if (e.status == 500) {
                    swal({ text: "เซิฟเวอร์ผิดพลาด", icon: "error", timer: 1600 })
                }

                return throwError(e)
                
            }),
            finalize(() =>  { console.log("complete") })
        )
    }

    disposable() {
        this.unsubscribe.next()
        this.unsubscribe.complete()
    }
}