import { momentPrototype } from "../constructors/moment";
import { normalizeUnits } from "../units/aliases";
import { cloneWithOffset } from "../units/offset";
import moment from "../moment"; // TODO: Find a better way of referencing moment() and moment.duration()

function createComparer (callback) {
    return function (other, units) {
        units = normalizeUnits(units || 'ms');
        if (units === 'millisecond') {
            other = moment.isMoment(other) ? other : moment(other);
            return callback(+this, +other);
        }
        return callback(+this.clone().startOf(units), +cloneWithOffset(other, this).startOf(units));
    };
}

momentPrototype().isAfter = createComparer(function (a, b) {
    return a > b;
});

momentPrototype().isBefore = createComparer(function (a, b) {
    return a < b;
});

momentPrototype().isSame = createComparer(function (a, b) {
    return a === b;
});
