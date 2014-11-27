import { localePrototype } from "../constructors/locale";
import moment from "../moment"; // TODO: Find a better way to reference this

localePrototype._months = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
localePrototype.months = function (m) {
    return this._months[m.month()];
};

localePrototype._monthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
localePrototype.monthsShort = function (m) {
    return this._monthsShort[m.month()];
};

localePrototype.monthsParse = function (monthName) {
    var i, mom, regex;

    if (!this._monthsParse) {
        this._monthsParse = [];
    }

    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        if (!this._monthsParse[i]) {
            mom = moment.utc([2000, i]);
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
};
