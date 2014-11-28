import { localePrototype } from "../constructors/locale";
import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, matchWord } from "../parse/regex";
import moment from "../moment"; // TODO: Find a better way to reference this

// FORMATTING

addFormatToken("d", 0, "do", "day");

addFormatToken("dd", 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken("ddd", 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken("dddd", 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");

// ALIASES

addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");

// PARSING

addRegexToken("d",    match1to2);
addRegexToken("e",    match1to2);
addRegexToken("E",    match1to2);
addRegexToken("dd",   matchWord);
addRegexToken("ddd",  matchWord);
addRegexToken("dddd", matchWord);

// LOCALES

localePrototype._weekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
localePrototype.weekdays = function (m) {
    return this._weekdays[m.day()];
};

localePrototype._weekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
localePrototype.weekdaysShort = function (m) {
    return this._weekdaysShort[m.day()];
};

localePrototype._weekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
localePrototype.weekdaysMin = function (m) {
    return this._weekdaysMin[m.day()];
};

localePrototype.weekdaysParse = function (weekdayName) {
    var i, mom, regex;

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        if (!this._weekdaysParse[i]) {
            mom = moment([2000, 1]).day(i);
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
};
