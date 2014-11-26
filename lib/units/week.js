import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";

addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");

addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
