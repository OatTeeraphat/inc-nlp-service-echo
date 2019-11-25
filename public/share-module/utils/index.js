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
    merge,
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
    repeat,
    retry
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