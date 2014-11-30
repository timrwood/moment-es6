import { durationPrototype } from "../duration/constructor";
import { deprecate } from "../utils/deprecate";

durationPrototype().toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString);

var abs = Math.abs;

function toISOString() {
    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = abs(this.years());
    var M = abs(this.months());
    var D = abs(this.days());
    var h = abs(this.hours());
    var m = abs(this.minutes());
    var s = abs(this.seconds() + this.milliseconds() / 1000);
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

durationPrototype().toString = durationPrototype().toISOString = toISOString;
