// for anything initialize
const { 
    bufferCount, 
    isEmpty, 
    startWith, 
    scan, 
    concatMap, 
    debounceTime,
    throttleTime,
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
    fromEvent,
    interval,
    empty
} = rxjs

const { 
    ajax, 
    AjaxRequest, 
    AjaxResponse, 
    AjaxError, 
    AjaxTimeoutError 
} = rxjs.ajax


const getSocketHost = function() {
    var loc = window.location;
    var uri = 'ws:';

    if (loc.protocol === 'https:') {
        uri = 'wss:';
    }
    uri += '//' + loc.host;
    return uri
}

const getHttpHost = function () {
    var loc = window.location;
    return loc.protocol + '//' + loc.host
}

// custom rxjs operator
const vueCatchError = (cookieRepo, vueRouter) => catchError( e => {

    if (cookieRepo === undefined ) { throw new Error("cookieRepo undefined") }
    if (vueRouter === undefined ) { throw new Error("vueRouter undefined") }

    console.error("vueCatchError ", e)

    if ( e instanceof AjaxError ) {

        if (e.status == 401) {
            cookieRepo.removeCustomerSession()
            swal({ text: "ไม่มีสิทธิ์เข้าถึงการใช้งาน", icon: "error", timer: 1600 })
            vueRouter.push('/')
            return throwError(e)
        }
    
    
        if (e.status == 403) {
            console.error("403")
        }
    
    
        if (e.status == 500) {
            swal({ text: "เซิฟเวอร์ผิดพลาด", icon: "error", timer: 1600 })
            return throwError(e)
        }
    }

    return throwError(e)
})