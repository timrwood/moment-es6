import { momentPrototype } from "../constructors/moment";
import { formatMoment } from "../format/format";
import moment from "../moment"; // TODO: Find a better way to register defaultFormat

momentPrototype().toString = function () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
};

momentPrototype().toISOString = momentPrototype().toJSON = function () {
    var m = this.clone().utc();
    if (0 < m.year() && m.year() <= 9999) {
        return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    } else {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
};

momentPrototype().format = function (inputString) {
    var output = formatMoment(this, inputString || moment.defaultFormat);
    return this.localeData().postformat(output);
};
