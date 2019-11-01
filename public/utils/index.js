// for anything initialize
const { 
    bufferCount, 
    isEmpty, 
    startWith, 
    scan, 
    concatMap, 
    debounceTime, 
    takeWhile, 
    takeUntil, 
    map, 
    pipe, 
    take, 
    skip, 
    retryWhen, 
    tap, 
    delay, 
    first, 
    switchMap, 
    mergeMap,
    exhaustMap, 
    mapTo, 
    catchError, 
    finalize, 
    filter, 
    repeat
} = rxjs.operators

const { 
    BehaviorSubject, 
    Subject, 
    zip, 
    forkJoin, 
    of, 
    from, 
    throwError, 
    fromEvent 
} = rxjs

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