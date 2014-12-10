import { durationPrototype } from "../duration/constructor";
import { getLocale } from "../locale/locales";
import { deprecate } from "../utils/deprecate";

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
export function locale (key) {
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
}

export var lang = durationPrototype.lang = deprecate(
    'moment().lang() is deprecated. Use moment().localeData() instead.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

export function localeData () {
    return this._locale;
}

durationPrototype.locale = locale;
durationPrototype.lang = lang;
durationPrototype.localeData = localeData;
