import { localePrototype } from "./constructor";

localePrototype._ordinal = '%d';
localePrototype.ordinal = function (number) {
    return this._ordinal.replace('%d', number);
};

localePrototype._ordinalParse = /\d{1,2}/;
