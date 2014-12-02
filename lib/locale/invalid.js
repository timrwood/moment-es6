import { localePrototype } from "./constructor";

localePrototype._invalidDate= 'Invalid date';
localePrototype.invalidDate= function () {
    return this._invalidDate;
};
