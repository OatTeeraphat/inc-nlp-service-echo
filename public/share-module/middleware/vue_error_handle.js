class VueErrorHandler {
  
    constructor(cookieRepo, vueRouter) {
        this.vueRouter = vueRouter
        this.cookieRepo = cookieRepo
    }

    catchHttpError = () => catchError( e => {

        if ( e instanceof AjaxError ) {
            if (e.status == 401) {
                swal({ text: "ไม่มีสิทธิ์เข้าถึงการใช้งาน", icon: "error", timer: 1600 })
                this.cookieRepo.removeClientSession()
                if ( this.vueRouter.history.current.path !== "/login" ) {
                    this.vueRouter.replace('/login')
                }
            }
        
            else if (e.status == 403) {
                swal({ text: "ไม่สามารถทำรายการต่อไปได้", icon: "error", timer: 1600 })
                this.cookieRepo.removeClientSession()
                console.error("403")
            }
            
            else if (e.status == 500) {
                swal({ text: "เซิฟเวอร์ผิดพลาด", icon: "error", timer: 1600 })
            }

            else if (e.status > 304) {
                swal({ text: "เซิฟเวอร์ผิดพลาด", icon: "error", timer: 1600 })
            }
            
            else {
                swal({ text: "ยังไม่ได้ดัก", icon: "error", timer: 1600 })
            }
        }
        console.error("catchHttpError", e)
        return of(e)
    })
    
}
