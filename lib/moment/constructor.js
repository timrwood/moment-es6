export { Moment, momentPrototype, isMoment, copyConfig, momentProperties, checkOverflow };
import { daysInMonth } from "../units/month";
import hasOwnProp from "../utils/has-own-prop";

// extra moment internal properties (plugins register props here)
var momentProperties = [];
var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;

function copyConfig(to, from) {
    var i, prop, val;

    if (typeof from._isAMomentObject !== 'undefined') {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (typeof from._i !== 'undefined') {
        to._i = from._i;
    }
    if (typeof from._f !== 'undefined') {
        to._f = from._f;
    }
    if (typeof from._l !== 'undefined') {
        to._l = from._l;
    }
    if (typeof from._strict !== 'undefined') {
        to._strict = from._strict;
    }
    if (typeof from._tzm !== 'undefined') {
        to._tzm = from._tzm;
    }
    if (typeof from._isUTC !== 'undefined') {
        to._isUTC = from._isUTC;
    }
    if (typeof from._offset !== 'undefined') {
        to._offset = from._offset;
    }
    if (typeof from._pf !== 'undefined') {
        to._pf = from._pf;
    }
    if (typeof from._locale !== 'undefined') {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i in momentProperties) {
            prop = momentProperties[i];
            val = from[prop];
            if (typeof val !== 'undefined') {
                to[prop] = val;
            }
        }
    }

    return to;
}

function checkOverflow(m) {
    var overflow;
    if (m._a && m._pf.overflow === -2) {
        overflow =
            m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
            m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
            m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
            m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
            m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
            m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }

        m._pf.overflow = overflow;
    }
}

// Moment prototype object
function Moment(config, skipOverflow) {
    if (skipOverflow !== false) {
        checkOverflow(config);
    }
    copyConfig(this, config);
    this._d = new Date(+config._d);
}

function momentPrototype () {
    return Moment.prototype;
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && hasOwnProp(obj, '_isAMomentObject'));
}
