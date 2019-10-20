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

    confirmTransaction = (ajaxFunction) => {
        return from( swal("Click on either the button or outside the modal.") )
        .pipe(
            switchMap( () => ajaxFunction ),
            catchError( e => {
                console.error(e)
                if (e instanceof Error) {
                    swal({ text: e.message, icon: "error", timer: 600 })
                }
                if ( e instanceof AjaxError ) {
                    swal({ text: e.response.message, icon: "error", timer: 600 })
                }
                return throwError(new Error("fallback"))
            }),
            finalize(() => swal(`The returned .. .`, {icon: "success", timer: 600}))
        )
    }
}