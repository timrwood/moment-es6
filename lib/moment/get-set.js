export { get, set, makeGetSet };

import { momentPrototype } from "../moment/constructor";
import { normalizeUnits } from "../units/aliases";
import { hooks } from "../utils/hooks";

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
}

function set (mom, unit, value) {
    return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
}

// MOMENTS

momentPrototype().get = momentPrototype().set = function (unit, value) {
    unit = normalizeUnits(unit);
    return this[unit](value);
};
