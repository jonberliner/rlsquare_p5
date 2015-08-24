var jsbutil = function() {
    'use strict';
    var self = this;

    var postRoute = function(url, datahash, callback, errorcallback) {
        $.ajax(url, {
            type: "POST",
            data: datahash,
            success: callback,
            error: errorcallback
        });
    };

    var getRoute = function(url, datahash, callback, errorcallback) {
        $.ajax(url, {
            type: "GET",
            data: datahash,
            success: callback,
            error: errorcallback
        });
    };
    return self;
};
