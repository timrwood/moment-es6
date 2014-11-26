import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";

addFormatToken("m", ["mm", 2], 0, "minute");

addUnitAlias("minute", "m");
