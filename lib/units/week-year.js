import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match1to4, match1to6, match2, match4, match6, matchSigned } from "../parse/regex";

// FORMATTING

addFormatToken(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function weekYear (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

weekYear("gggg",     "weekYear");
weekYear("ggggg",    "weekYear");
weekYear("GGGG",  "isoWeekYear");
weekYear("GGGGG", "isoWeekYear");

// ALIASES

addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");

// PARSING

addRegexToken("G",      matchSigned);
addRegexToken("g",      matchSigned);
addRegexToken("GG",     match1to2, match2);
addRegexToken("gg",     match1to2, match2);
addRegexToken("GGGG",   match1to4, match4);
addRegexToken("gggg",   match1to4, match4);
addRegexToken("GGGGG",  match1to6, match6);
addRegexToken("ggggg",  match1to6, match6);
