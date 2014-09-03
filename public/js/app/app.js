/**
 * @desc        app globals
 */
define([
    "jquery",
    "underscore",
    "backbone",
    "events",
    "utils",
    "handlebars"
],
function($, _, Backbone, notifier) {

    var app = {
        root : "/menage",                     // The root path to run the application through.
        URL : "/menage",                      // Base application URL
        API : "/api",                   // Base API URL (used by models & collections)
        maxTextLength: 95,
        LIMIT_LAST_COMPLETED: 5
    };


    $.ajaxSetup({ cache: false });          // force ajax call on all browsers


    // Global event aggregator
    app.eventAggregator = notifier;

    return app;

});