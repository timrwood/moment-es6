import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";

addFormatToken("D", ["DD", 2], "Do", "date");

addUnitAlias("date", "D");
