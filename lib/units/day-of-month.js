import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match2 } from "../parse/regex";

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
