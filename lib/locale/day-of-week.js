import { localePrototype } from "../constructors/locale";
import moment from "../moment"; // TODO: Find a better way to reference this


localePrototype._weekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
localePrototype.weekdays = function (m) {
    return this._weekdays[m.day()];
};

localePrototype._weekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
localePrototype.weekdaysShort = function (m) {
    return this._weekdaysShort[m.day()];
};

localePrototype._weekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
localePrototype.weekdaysMin = function (m) {
    return this._weekdaysMin[m.day()];
};

localePrototype.weekdaysParse = function (weekdayName) {
    var i, mom, regex;

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        if (!this._weekdaysParse[i]) {
            mom = moment([2000, 1]).day(i);
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
};
