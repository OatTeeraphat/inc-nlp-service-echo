// sweet alert observable wrapper
class SweetAlertAjaxWrapper {

    constructor() {
        this.duration = 900
    }

    // readTransaction 
    readTransaction = (ajaxFunction) => {
        return ajaxFunction.pipe(
            catchError( e => {
                if (e instanceof Error) {
                    swal({ text: e.message, icon: "error", timer: this.duration })
                }
                if ( e instanceof AjaxError ) {
                    swal({ text: e.response.message, icon: "error", timer: this.duration })
                }
                return throwError(e)
            }),
        )
    }
    // confirmTransaction is cancel return { cancel: true } **
    confirmTransaction = (ajaxFunction) => {
        return from( swal("confirm transaction", { buttons: { cancel: true, ok: true } }) ).pipe(
            switchMap( it => {
                if (it) {
                    return ajaxFunction
                }
                return of({cancel: true})
            }),
            map( it => { 
                if (!it.cancel) {
                    swal('resolve', {icon: "success", timer: this.duration}) 
                }
                return it
            }),
            catchError( e => {
                if (e instanceof Error) {
                    swal({ text: e.message, icon: "error", timer: this.duration })
                }
                if ( e instanceof AjaxError ) {
                    swal({ text: e.response.message, icon: "error", timer: this.duration })
                }
                return throwError(e)
            }),
            finalize(() =>  { console.log("complete") })
        )
    }
}