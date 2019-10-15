// for anything initialize
getHost = function() {
    var loc = window.location;
    var uri = 'ws:';

    if (loc.protocol === 'https:') {
    uri = 'wss:';
    }
    uri += '//' + loc.host;
    return uri
}