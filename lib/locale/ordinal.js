import { localePrototype } from "../constructors/locale";

localePrototype._ordinal = '%d';
localePrototype.ordinal = function (number) {
    return this._ordinal.replace('%d', number);
};

localePrototype._ordinalParse = /\d{1,2}/;
