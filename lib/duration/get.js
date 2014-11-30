import { durationPrototype } from "../duration/constructor";
import { normalizeUnits } from "../units/aliases";
import absFloor from "../utils/abs-floor";

durationPrototype.get = function (units) {
    units = normalizeUnits(units);
    return this[units + 's']();
};

function makeDurationGetter(name) {
    durationPrototype[name] = function () {
        return this._data[name];
    };
}

makeDurationGetter('milliseconds');
makeDurationGetter('seconds');
makeDurationGetter('minutes');
makeDurationGetter('hours');
makeDurationGetter('days');
makeDurationGetter('months');
makeDurationGetter('years');

durationPrototype.weeks = function () {
    return absFloor(this.days() / 7);
};
