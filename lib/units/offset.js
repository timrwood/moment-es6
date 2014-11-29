export { offsetFromString, cloneWithOffset };

import zeroFill from "../utils/zero-fill";
import { addFormatToken } from "../format/format";
import { addRegexToken, matchOffset } from "../parse/regex";
import { addParseToken } from "../parse/token";
import toInt from "../utils/to-int";
import moment from "../moment"; // TODO: Find a better way to reference this

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = -this.zone();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset("Z", ":");
offset("ZZ", "");

// PARSING

addRegexToken("Z",  matchOffset);
addRegexToken("ZZ", matchOffset);
addParseToken(["Z", "ZZ"], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(string) {
    var matches = ((string || "").match(matchOffset) || []);
    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return parts[0] === '+' ? -minutes : minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    return model._isUTC ? moment(input).zone(model._offset || 0) : moment(input).local();
}
