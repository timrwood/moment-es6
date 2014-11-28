import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match1to4, match1to6, match2, match4, match6, matchSigned } from "../parse/regex";

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
