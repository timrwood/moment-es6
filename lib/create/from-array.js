export { configFromArray };

import { createDate, createUTCDate } from "./date-from-array";
import { daysInYear } from "../units/year";
import { weekOfYear } from "../units/week";
import { dayOfYearFromWeeks } from "../units/day-of-year";
import { YEAR, MONTH, DATE } from "../units/constants";
import { createLocal } from "./local";
import defaults from "../utils/defaults";

function currentDateArray(config) {
    var now = new Date();
    if (config._useUTC) {
        return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
    }
    return     [now.getFullYear(),    now.getMonth(),    now.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse)) {
            config._pf._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual zone can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(createLocal(), dow, doy).year);
        week = defaults(w.w, 1);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < dow) {
                ++week;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
}