import { momentPrototype } from "../moment/constructor";
import { isValid } from "../create/valid";
import extend from "../utils/extend";

momentPrototype.isValid = function () {
    return isValid(this);
};

momentPrototype.parsingFlags = function () {
    return extend({}, this._pf);
};

momentPrototype.invalidAt = function () {
    return this._pf.overflow;
};
