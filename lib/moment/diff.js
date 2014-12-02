import { momentPrototype } from "./constructor";
import absFloor from "../utils/abs-floor";
import { cloneWithOffset } from "../units/offset";
import { normalizeUnits } from "../units/aliases";
import { createLocal } from "../create/local";

momentPrototype.diff = function (input, units, asFloat) {
    var that = cloneWithOffset(input, this),
        zoneDiff = (this.zone() - that.zone()) * 6e4,
        diff, output, daysAdjust;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month') {
        // average number of days in the months in the given dates
        diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
        // difference in months
        output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
        // adjust by taking difference in days, average number of days
        // and dst in the given months.
        daysAdjust = (this - createLocal(this).startOf('month')) -
            (that - createLocal(that).startOf('month'));
        // same as above but with zones, to negate all dst
        daysAdjust -= ((this.zone() - createLocal(this).startOf('month').zone()) -
                (that.zone() - createLocal(that).startOf('month').zone())) * 6e4;
        output += daysAdjust / diff;
        if (units === 'year') {
            output = output / 12;
        }
    } else {
        diff = (this - that);
        output = units === 'second' ? diff / 1e3 : // 1000
            units === 'minute' ? diff / 6e4 : // 1000 * 60
            units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            diff;
    }
    return asFloat ? output : absFloor(output);
};
