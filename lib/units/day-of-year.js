import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match3, match1to3 } from "../parse/regex";

// FORMATTING

addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");

// ALIASES

addUnitAlias("dayOfYear", "DDD");

// PARSING

addRegexToken("DDD",  match1to3);
addRegexToken("DDDD", match3);
