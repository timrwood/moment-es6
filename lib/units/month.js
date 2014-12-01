export { daysInMonth, setMonth };

import { localePrototype } from "../locale/constructor";
import { momentPrototype } from "../moment/constructor";
import { get } from "../moment/get-set";
import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match2, matchWord } from "../parse/regex";
import { addParseToken } from "../parse/token";
import { hooks } from "../utils/hooks";
import toInt from "../utils/to-int";
import { createUTC } from "../create/utc";

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
});

addFormatToken("MMM", 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken("MMMM", 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias("month", "M");

// PARSING

addRegexToken("M",    match1to2);
addRegexToken("MM",   match1to2, match2);
addRegexToken("MMM",  matchWord);
addRegexToken("MMMM", matchWord);

addParseToken(["M", "MM"], function (input, array) {
    array[1] = toInt(input) - 1; // TODO: use a constant for MONTH
});

addParseToken(["MMM", "MMMM"], function (input, array, config) {
    var month = config._locale.monthsParse(input);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[1] = month; // TODO: use a constant for MONTH
    } else {
        config._pf.invalidMonth = input;
    }
});

// LOCALES

localePrototype._months = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
localePrototype.months = function (m) {
    return this._months[m.month()];
};

localePrototype._monthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
localePrototype.monthsShort = function (m) {
    return this._monthsShort[m.month()];
};

localePrototype.monthsParse = function (monthName) {
    var i, mom, regex;

    if (!this._monthsParse) {
        this._monthsParse = [];
    }

    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        if (!this._monthsParse[i]) {
            mom = createUTC([2000, i]);
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
};

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    // TODO: Move this out of here!
    if (typeof value === 'string') {
        value = mom.localeData().monthsParse(value);
        // TODO: Another silent failure?
        if (typeof value !== 'number') {
            return mom;
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

momentPrototype.month = momentPrototype.months = function (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, "Month");
    }
};

momentPrototype.daysInMonth = function () {
    return daysInMonth(this.year(), this.month());
};
