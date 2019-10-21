// for anything initialize
getSocketHost = function() {
    var loc = window.location;
    var uri = 'ws:';

    if (loc.protocol === 'https:') {
        uri = 'wss:';
    }
    uri += '//' + loc.host;
    return uri
}

getHttpHost = function () {
    var loc = window.location;
    return loc.protocol + '//' + loc.host
}

class SweetAlertAjaxWrapper {

    readTransaction = (ajaxFunction) => {
        return ajaxFunction.pipe(
            catchError( e => {
                if (e instanceof Error) {
                    swal({ text: e.message, icon: "error", timer: 600 })
                }
                if ( e instanceof AjaxError ) {
                    swal({ text: e.response.message, icon: "error", timer: 600 })
                }
                return throwError(new Error("fallback"))
            }),
        )
    }

    // confirmTransaction is cancel return { cancel: true } **
    confirmTransaction = (ajaxFunction) => {
        return from( swal("confirm transaction", { buttons: { cancel: true, ok: true } }) )
        .pipe(
            switchMap( it => {
                if (it) {
                    return ajaxFunction
                }
                return of({cancel: true})
            }),
            catchError( e => {
                if (e instanceof Error) {
                    swal({ text: e.message, icon: "error", timer: 600 })
                }
                if ( e instanceof AjaxError ) {
                    swal({ text: e.response.message, icon: "error", timer: 600 })
                }
                return throwError(new Error("fallback"))
            }),
            finalize(() => swal('resolve', {icon: "success", timer: 600}))
        )
    }
}