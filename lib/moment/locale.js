import { momentPrototype } from "../constructors/moment";
import { durationPrototype } from "../constructors/duration";
import { getLocale } from "../locale/locales";
import { deprecate } from "../utils/deprecate";

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
momentPrototype().locale = durationPrototype().locale = function (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
};

momentPrototype().lang = durationPrototype().lang = deprecate(
    'moment().lang() is deprecated. Use moment().localeData() instead.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

momentPrototype().localeData = durationPrototype().localeData = function () {
    return this._locale;
};
