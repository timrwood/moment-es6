import { durationPrototype } from "../constructors/duration";

var abs = Math.abs;

durationPrototype().abs = function () {
    var data           = this._data;

    this._milliseconds = abs(this._milliseconds);
    this._days         = abs(this._days);
    this._months       = abs(this._months);

    data.milliseconds  = abs(data.milliseconds);
    data.seconds       = abs(data.seconds);
    data.minutes       = abs(data.minutes);
    data.hours         = abs(data.hours);
    data.months        = abs(data.months);
    data.years         = abs(data.years);

    return this;
};
