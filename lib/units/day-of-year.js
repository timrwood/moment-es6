import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";

addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");

addUnitAlias("dayOfYear", "DDD");
