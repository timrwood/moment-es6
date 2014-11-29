import { addFormatToken } from "../format/format";
import { addRegexToken, matchTimestamp } from "../parse/regex";
import { addParseToken } from "../parse/token";

// FORMATTING

addFormatToken("X", 0, 0, "unix");

// PARSING

addRegexToken("X", matchTimestamp);
addParseToken("X", function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
