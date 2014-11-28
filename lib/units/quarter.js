import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1 } from "../parse/regex";

// FORMATTING

addFormatToken("Q", 0, 0, "quarter");

// ALIASES

addUnitAlias("quarter", "Q");

// PARSING

addRegexToken("Q", match1);
