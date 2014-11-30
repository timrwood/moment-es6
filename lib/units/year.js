export { daysInYear, isLeapYear };

import { momentPrototype } from "../constructors/moment";
import { makeGetSet } from "../moment/get-set";
import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match1to4, match1to6, match2, match4, match6, matchSigned } from "../parse/regex";
import { addParseToken } from "../parse/token";
import { deprecate } from "../utils/deprecate";
import moment from "../moment"; // TODO: Find a better way of referencing moment.parseTwoDigitYear

// FORMATTING

addFormatToken(0, ["YY", 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ["YYYY",   4],       0, "year");
addFormatToken(0, ["YYYYY",  5],       0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");

// ALIASES

addUnitAlias("year", "y");

// PARSING

addRegexToken("Y",      matchSigned);
addRegexToken("YY",     match1to2, match2);
addRegexToken("YYYY",   match1to4, match4);
addRegexToken("YYYYY",  match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);

addParseToken(["YYYY", "YYYYY", "YYYYYY"], 0);
addParseToken("YY", function (input, array) {
    array[0] = moment.parseTwoDigitYear(input);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// MOMENTS

var getSetYear = makeGetSet('FullYear', false);
momentPrototype().year = getSetYear;
momentPrototype().years = deprecate('years accessor is deprecated. Use year instead.', getSetYear);
