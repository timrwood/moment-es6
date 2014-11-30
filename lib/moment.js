//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

var VERSION = '2.8.3';

import "./duration/all";
import "./locale/all";
import "./moment/all";
import "./units/all";

import toInt from "./utils/to-int";
import { deprecate } from "./utils/deprecate";

import createLocal from "./create/local";
import createUTC from "./create/utc";
import { createInvalid } from "./create/valid";

import { createDuration } from "./duration/create";

import { isMoment, momentProperties, momentPrototype } from "./moment/constructor";
import { isDuration } from "./duration/constructor";

import { normalizeUnits } from "./units/aliases";

import { min, max } from "./moment/min-max";

import { getSetRelativeTimeThreshold } from "./duration/humanize";

import { getSetGlobalLocale, defineLocale, getLocale } from "./locale/locales";
import { listMonths, listMonthsShort, listWeekdays, listWeekdaysShort, listWeekdaysMin } from "./locale/lists";

function moment () {
    return createLocal.apply(null, arguments);
}

moment.suppressDeprecationWarnings = false;

moment.createFromInputFallback = deprecate(
    'moment construction falls back to js Date. This is ' +
    'discouraged and will be removed in upcoming major ' +
    'release. Please refer to ' +
    'https://github.com/moment/moment/issues/1407 for more info.',
    function (config) {
        config._d = new Date(config._i);
    }
);

moment.min = min;
moment.max = max;

// creating with utc
moment.utc = createUTC;

// creating with unix timestamp (in seconds)
moment.unix = function (input) {
    return createLocal(input * 1000);
};

// duration
moment.duration = createDuration;

// version number
moment.version = VERSION;

// default format
moment.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

// constant that refers to the ISO standard
moment.ISO_8601 = function () {};

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
moment.momentProperties = momentProperties;

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
moment.updateOffset = function () {};

moment.relativeTimeThreshold = getSetRelativeTimeThreshold;
moment.locale = getSetGlobalLocale;
moment.defineLocale = defineLocale;
moment.localeData = getLocale;
moment.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
moment.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

moment.isMoment = isMoment;
moment.isDuration = isDuration;

moment.months        = listMonths;
moment.monthsShort   = listMonthsShort;
moment.weekdays      = listWeekdays;
moment.weekdaysShort = listWeekdaysShort;
moment.weekdaysMin   = listWeekdaysMin;

moment.normalizeUnits = normalizeUnits;

moment.invalid = createInvalid;
moment.fn = momentPrototype();

moment.parseZone = function () {
    return moment.apply(null, arguments).parseZone();
};

moment.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

export { moment };
export default moment;
