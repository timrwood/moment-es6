export { get, set, makeGetSet };

import moment from "../moment"; // TODO: Find a better way to reference this

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            moment.updateOffset(this, keepTime);
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
