import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";

addFormatToken("s", ["ss", 2], 0, "second");

addUnitAlias("second", "s");
