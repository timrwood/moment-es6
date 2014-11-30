import { momentPrototype } from "../moment/constructor";
import { addFormatToken } from "../format/format";

// FORMATTING

addFormatToken("z",  0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");

// MOMENTS

momentPrototype().zoneAbbr = function () {
    return this._isUTC ? 'UTC' : '';
};

momentPrototype().zoneName = function () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
};
