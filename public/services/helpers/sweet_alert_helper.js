// sweet alert observable wrapper
// this project can be support icon : success, error, warning and non assign icon

class SweetAlertAjaxHelper {

    constructor() {
        this.duration = 900
    }

    isSwalCancelEvent(event) {
        return event.cancel == true
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
        return from( swal("confirm transaction", { icon: "warning", buttons: { ok: true, cancel: true } }) ).pipe(
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