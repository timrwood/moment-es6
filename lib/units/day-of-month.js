import { momentPrototype } from "../moment/constructor";
import { makeGetSet } from "../moment/get-set";
import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match2 } from "../parse/regex";
import { addParseToken } from "../parse/token";
import toInt from "../utils/to-int";
import { deprecate } from "../utils/deprecate";

// FORMATTING

addFormatToken("D", ["DD", 2], "Do", "date");

// ALIASES

addUnitAlias("date", "D");

// PARSING

addRegexToken("D",  match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function (isStrict, locale) {
    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
});

addParseToken(["D", "DD"], 2); // TODO: use a constant for DATE
addParseToken("Do", function (input, array) {
    array[2] = toInt(input.match(match1to2)[0], 10); // TODO: use a constant for DATE
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);
momentPrototype.date = getSetDayOfMonth;
momentPrototype.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
