import absFloor from "../utils/abs-floor";
import { cloneWithOffset } from "../units/offset";
import { normalizeUnits } from "../units/aliases";
import { createLocal } from "../create/local";

export function diff (input, units, asFloat) {
    var that = cloneWithOffset(input, this),
        zoneDelta = (this.zone() - that.zone()) * 6e4,
        delta, output, daysAdjust;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month') {
        // average number of days in the months in the given dates
        delta = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
        // difference in months
        output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
        // adjust by taking difference in days, average number of days
        // and dst in the given months.
        daysAdjust = (this - createLocal(this).startOf('month')) -
            (that - createLocal(that).startOf('month'));
        // same as above but with zones, to negate all dst
        daysAdjust -= ((this.zone() - createLocal(this).startOf('month').zone()) -
                (that.zone() - createLocal(that).startOf('month').zone())) * 6e4;
        output += daysAdjust / delta;
        if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = (this - that);
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}
