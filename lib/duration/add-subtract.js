import { createDuration } from "./create";
import { durationPrototype } from "../duration/constructor";

// supports only 2.0-style add(1, 's') or add(duration)
durationPrototype.add = function (input, val) {
    var dur = createDuration(input, val);

    this._milliseconds += dur._milliseconds;
    this._days         += dur._days;
    this._months       += dur._months;

    return this._bubble();
};

// supports only 2.0-style subtract(1, 's') or subtract(duration)
durationPrototype.subtract = function (input, val) {
    var dur = createDuration(input, val);

    this._milliseconds -= dur._milliseconds;
    this._days         -= dur._days;
    this._months       -= dur._months;

    return this._bubble();
};
