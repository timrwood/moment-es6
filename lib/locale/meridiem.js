import { localePrototype } from "../constructors/locale";

localePrototype.isPM = function (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
};

localePrototype._meridiemParse = /[ap]\.?m?\.?/i;
localePrototype.meridiem = function (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
};
