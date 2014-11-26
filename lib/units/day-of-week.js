import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";

addFormatToken("d", 0, "do", "day");

addFormatToken("dd", 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken("ddd", 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken("dddd", 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");

addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
