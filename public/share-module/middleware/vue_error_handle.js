export class VueErrorHandler {
  
    constructor(cookieRepo, vueRouter) {
        this.vueRouter = vueRouter
        this.cookieRepo = cookieRepo
    }

    catchHttpError = (title="Can't Reslove", description) => catchError( e => {
        
        if ( e instanceof AjaxError ) {
            
            if (e.status == 401) {
                console.error("401 from catchHttpError ", e)
                swal2(ALERT.ERROR, { title: title, text: description} )
                this.cookieRepo.removeClientSession()
                if ( this.vueRouter.history.current.path !== "/login" ) {
                    this.vueRouter.replace('/login')
                }
            }
        
            else if (e.status == 403) {
                console.error("403 from catchHttpError ", e)
                swal2('error', { text: "ไม่สามารถทำรายการต่อไปได้"})
                this.cookieRepo.removeClientSession()
                if ( this.vueRouter.history.current.path !== "/login" ) {
                    this.vueRouter.replace('/login')
                }

            }
            
            else if (e.status == 500) {
                swal2('error', { text: "เซิฟเวอร์ผิดพลาด"})
            }

            else if (e.status > 304) {
                swal2('error', { text: "เซิฟเวอร์ผิดพลาด"})
            }

            else {
                swal2('error', { text: "ยังไม่ได้ดัก"})
            }
        }
        return of(e)
    })
    
}
