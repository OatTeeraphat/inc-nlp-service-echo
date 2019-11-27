export class VueErrorHandler {
  
    constructor(cookieRepo, vueRouter) {
        this.vueRouter = vueRouter
        this.cookieRepo = cookieRepo
    }

    catchHttpError = () => catchError( e => {

        if ( e instanceof AjaxError ) {
            if (e.status == 401) {
                swal2('error', { text: "ไม่มีสิทธิ์เข้าถึงการใช้งาน"})
                this.cookieRepo.removeClientSession()
                if ( this.vueRouter.history.current.path !== "/login" ) {
                    this.vueRouter.replace('/login')
                }
            }
        
            else if (e.status == 403) {
                swal2('error', { text: "ไม่สามารถทำรายการต่อไปได้"})
                this.cookieRepo.removeClientSession()
                console.error("403")
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
        console.error("catchHttpError", e)
        return of(e)
    })
    
}
