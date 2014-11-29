import { localePrototype } from "../constructors/locale";
import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match2 } from "../parse/regex";
import { addParseToken } from "../parse/token";

// FORMATTING

addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, function () {
    return this.hours() % 12 || 12;
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias("hour", "h");

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken("a",  matchMeridiem);
addRegexToken("A",  matchMeridiem);
addRegexToken("H",  match1to2);
addRegexToken("h",  match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);

addParseToken(["h", "hh", "H", "HH"], 3); // TODO: use a constant for HOUR
addParseToken(["a", "A"], function (input, array, config) {
   config._isPm = config._locale.isPM(input);
});

// LOCALES

localePrototype.isPM = function (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
};

localePrototype._meridiemParse = /[ap]\.?m?\.?/i;
localePrototype.meridiem = function (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
};
