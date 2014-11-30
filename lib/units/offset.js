export { cloneWithOffset };

import zeroFill from "../utils/zero-fill";
import { momentPrototype } from "../constructors/moment";
import { createDuration } from "../duration/create";
import { addSubtract } from "../moment/add-subtract";
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

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
momentPrototype().zone = function (input, keepLocalTime) {
    var offset = this._offset || 0,
        localAdjust;
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(input);
        }
        if (Math.abs(input) < 16) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = this._dateTzOffset();
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.subtract(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(offset - input, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                moment.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
    } else {
        return this._isUTC ? offset : this._dateTzOffset();
    }
    return this;
};
