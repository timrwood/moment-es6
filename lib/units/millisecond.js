import { addFormatToken } from "../format/format";

addFormatToken("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

function milliseconds (token) {
    addFormatToken(0, [token, 3], 0, "millisecond");
}

milliseconds("SSS");
milliseconds("SSSS");
