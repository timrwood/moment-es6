import { addFormatToken, leftZeroFill } from "../format/format";
import { addRegexToken, matchOffset } from "../parse/regex";

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = -this.zone();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + leftZeroFill(~~(offset / 60), 2) + separator + leftZeroFill(~~(offset) % 60, 2);
    });
}

offset("Z", ":");
offset("ZZ", "");

// PARSING

addRegexToken("Z",  matchOffset);
addRegexToken("ZZ", matchOffset);
