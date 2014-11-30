import { momentPrototype } from "../moment/constructor";
import { formatMoment } from "../format/format";
import { hooks } from "../utils/hooks";

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

momentPrototype.toString = function () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
};

momentPrototype.toISOString = momentPrototype.toJSON = function () {
    var m = this.clone().utc();
    if (0 < m.year() && m.year() <= 9999) {
        return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    } else {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
};

momentPrototype.format = function (inputString) {
    var output = formatMoment(this, inputString || hooks.defaultFormat);
    return this.localeData().postformat(output);
};
