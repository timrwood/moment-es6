import { localePrototype } from "../constructors/locale";

localePrototype._invalidDate= 'Invalid date';
localePrototype.invalidDate= function () {
    return this._invalidDate;
};
