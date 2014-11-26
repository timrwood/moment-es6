export { daysInMonth };
import { addFormatToken } from "../format/format";

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

addFormatToken("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
});

addFormatToken("MMM", 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken("MMMM", 0, 0, function (format) {
    return this.localeData().months(this, format);
});
