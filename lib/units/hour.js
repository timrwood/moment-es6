import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";

addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, function () {
    return this.hours() % 12 || 12;
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

addUnitAlias("hour", "h");
