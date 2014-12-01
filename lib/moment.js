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

import { deprecate } from "./utils/deprecate";

import { createLocal } from "./create/local";
import { createUTC } from "./create/utc";
import { createInvalid } from "./create/valid";

import { createDuration } from "./duration/create";
import { isDuration } from "./duration/constructor";
import { getSetRelativeTimeThreshold } from "./duration/humanize";

import { normalizeUnits } from "./units/aliases";

import { isMoment, momentPrototype } from "./moment/constructor";
import { min, max } from "./moment/min-max";

import { getSetGlobalLocale, defineLocale, getLocale } from "./locale/locales";
import { listMonths, listMonthsShort, listWeekdays, listWeekdaysShort, listWeekdaysMin } from "./locale/lists";

import { hooks, setHookCallback } from "./utils/hooks";

var moment = hooks;

setHookCallback(createLocal);

// creating with unix timestamp (in seconds)
moment.unix = function (input) {
    return createLocal(input * 1000);
};

moment.utc = createUTC;

moment.duration = createDuration;

// version number
moment.version = VERSION;

moment.relativeTimeThreshold = getSetRelativeTimeThreshold;

moment.locale       = getSetGlobalLocale;
moment.defineLocale = defineLocale;
moment.localeData   = getLocale;
moment.lang         = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
moment.langData     = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

moment.isMoment   = isMoment;
moment.isDuration = isDuration;

moment.min = min;
moment.max = max;

moment.months        = listMonths;
moment.monthsShort   = listMonthsShort;
moment.weekdays      = listWeekdays;
moment.weekdaysShort = listWeekdaysShort;
moment.weekdaysMin   = listWeekdaysMin;

moment.normalizeUnits = normalizeUnits;

moment.invalid = createInvalid;
moment.fn = momentPrototype;

moment.parseZone = function () {
    return createLocal.apply(null, arguments).parseZone();
};

export default moment;
