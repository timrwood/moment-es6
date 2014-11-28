import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1to2, match2 } from "../parse/regex";

// FORMATTING

addFormatToken("s", ["ss", 2], 0, "second");

// ALIASES

addUnitAlias("second", "s");

// PARSING

addRegexToken("s",  match1to2);
addRegexToken("ss", match1to2, match2);
