import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import moment from "../moment";

export { weekOfYear };

addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");

addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");


// firstDayOfWeek       0 = sun, 6 = sat
//                      the day of the week that starts the week
//                      (usually sunday or monday)
// firstDayOfWeekOfYear 0 = sun, 6 = sat
//                      the first week is the week that contains the first
//                      of this day of the week
//                      (eg. ISO weeks use thursday (4))
function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
    var end = firstDayOfWeekOfYear - firstDayOfWeek,
        daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
        adjustedMoment;


    if (daysToDayOfWeek > end) {
        daysToDayOfWeek -= 7;
    }

    if (daysToDayOfWeek < end - 7) {
        daysToDayOfWeek += 7;
    }

    adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
    return {
        week: Math.ceil(adjustedMoment.dayOfYear() / 7),
        year: adjustedMoment.year()
    };
}
