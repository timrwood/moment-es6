import { momentPrototype, isMoment } from "./constructor";
import { normalizeUnits } from "../units/aliases";
import { cloneWithOffset } from "../units/offset";
import { createLocal } from "../create/local";

function createComparer (callback) {
    return function (other, units) {
        units = normalizeUnits(units || 'ms');
        if (units === 'millisecond') {
            other = isMoment(other) ? other : createLocal(other);
            return callback(+this, +other);
        }
        return callback(+this.clone().startOf(units), +cloneWithOffset(other, this).startOf(units));
    };
}

momentPrototype.isAfter = createComparer(function (a, b) {
    return a > b;
});

momentPrototype.isBefore = createComparer(function (a, b) {
    return a < b;
});

momentPrototype.isSame = createComparer(function (a, b) {
    return a === b;
});
