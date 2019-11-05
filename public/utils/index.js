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

const { 
    ajax, 
    AjaxRequest, 
    AjaxResponse, 
    AjaxError, 
    AjaxTimeoutError 
} = rxjs.ajax

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