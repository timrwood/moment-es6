//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

    /************************************
        Constants
    ************************************/

    var VERSION = '2.8.3',
        i,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        // getter and setter names
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        };

    import "./duration/all";
    import "./locale/all";
    import "./moment/all";
    import "./units/all";

    import toInt         from "./utils/to-int";
    import hasOwnProp    from "./utils/has-own-prop";
    import extend        from "./utils/extend";
    import absFloor      from "./utils/abs-floor";
    import { deprecate } from "./utils/deprecate";

    import createLocal from "./create/local";
    import createUTC from "./create/utc";
    import { createInvalid } from "./create/valid";

    import { createDuration } from "./duration/create";

    import { isMoment, momentProperties, momentPrototype } from "./constructors/moment";
    import { Duration, isDuration }               from "./constructors/duration";

    import { normalizeUnits }  from "./units/aliases";

    import { min, max } from "./moment/min-max";

    import { getSetRelativeTimeThreshold } from "./duration/humanize";
    import { daysToYears, yearsToDays } from "./duration/bubble";

    import { getSetGlobalLocale, defineLocale, getLocale } from "./locale/locales";
    import { listMonths, listMonthsShort, listWeekdays, listWeekdaysShort, listWeekdaysMin } from "./locale/lists";

    /************************************
        Top Level Functions
    ************************************/

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
    moment.defaultFormat = isoFormat;

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

    /************************************
        Duration Prototype
    ************************************/

    extend(moment.duration.fn = Duration.prototype, {
        weeks : function () {
            return absFloor(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + yearsToDays(this._months / 12);
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        }
    });


    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /* EMBED_LOCALES */

    export { moment };
    export default moment;
