import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match2 } from "../parse/regex";
import { addParseToken } from "../parse/token";

// FORMATTING

addFormatToken("m", ["mm", 2], 0, "minute");

// ALIASES

addUnitAlias("minute", "m");

// PARSING

addRegexToken("m",  match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], 4); // TODO: use a constant for MINUTE