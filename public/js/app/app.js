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
        root : "/",                     // The root path to run the application through.
        URL : "/",                      // Base application URL
        API : "/api",                   // Base API URL (used by models & collections)
        maxTextLength: 95
    };


    $.ajaxSetup({ cache: false });          // force ajax call on all browsers


    // Global event aggregator
    app.eventAggregator = notifier;

    return app;

});