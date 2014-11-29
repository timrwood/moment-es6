export { daysInMonth };

import { localePrototype } from "../constructors/locale";
import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match2, matchWord } from "../parse/regex";
import { addParseToken } from "../parse/token";
import toInt from "../utils/to-int";
import moment from "../moment"; // TODO: Find a better way to reference this

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

localePrototype()._months = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
localePrototype().months = function (m) {
    return this._months[m.month()];
};

localePrototype()._monthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
localePrototype().monthsShort = function (m) {
    return this._monthsShort[m.month()];
};

localePrototype().monthsParse = function (monthName) {
    var i, mom, regex;

    if (!this._monthsParse) {
        this._monthsParse = [];
    }

    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        if (!this._monthsParse[i]) {
            mom = moment.utc([2000, i]);
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
};
