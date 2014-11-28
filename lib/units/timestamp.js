import { addFormatToken } from "../format/format";
import { addRegexToken, matchTimestamp } from "../parse/regex";

// FORMATTING

addFormatToken("X", 0, 0, "unix");

// PARSING

addRegexToken("X", matchTimestamp);
