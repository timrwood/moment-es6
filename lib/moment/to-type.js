import { momentPrototype } from "../moment/constructor";

momentPrototype.valueOf = function () {
    return +this._d + ((this._offset || 0) * 60000);
};

momentPrototype.unix = function () {
    return Math.floor(+this / 1000);
};

momentPrototype.toDate = function () {
    return this._offset ? new Date(+this) : this._d;
};

momentPrototype.toArray = function () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
};
