import { isMoment } from "./constructor";
import { normalizeUnits } from "../units/aliases";
import { createLocal } from "../create/local";

function createComparer (callback) {
    return function (other, units) {
        other = isMoment(other) ? other : createLocal(other);
        units = normalizeUnits(units || 'ms');
        if (units === 'millisecond') {
            return callback(+this, +other);
        }
        return callback(+this.clone().startOf(units), +other);
    };
}

export var isAfter = createComparer(function (a, b) {
    return a > b;
});

export var isBefore = createComparer(function (a, b) {
    return a < b;
});

export var isSame = createComparer(function (a, b) {
    return a === b;
});

export function isBetween (a, b, units) {
    return this.isAfter(a, units) && this.isBefore(b, units);
}
