import { addFormatToken } from "../format/format";

addFormatToken(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function weekYear (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

weekYear("gggg",     "weekYear");
weekYear("ggggg",    "weekYear");
weekYear("GGGG",  "isoWeekYear");
weekYear("GGGGG", "isoWeekYear");
