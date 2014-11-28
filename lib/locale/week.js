import { localePrototype } from "../constructors/locale";
import { weekOfYear } from "../units/week";

localePrototype.week = function (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
};

localePrototype._week = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};
