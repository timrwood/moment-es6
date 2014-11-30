import { localePrototype } from "../locale/constructor";

localePrototype()._calendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

localePrototype().calendar = function (key, mom) {
    var output = this._calendar[key];
    return typeof output === 'function' ? output.apply(mom) : output;
};
