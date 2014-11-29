export { deprecate, deprecateSimple };

import extend from "./extend";
import moment from "../moment"; // TODO: Find a better way to supress deprecations

function warn(msg) {
    if (moment.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
        if (firstTime) {
            warn(msg);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}
