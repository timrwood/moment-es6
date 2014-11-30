import { createLocalOrUTC } from "./from-anything";
import { hooks } from "../utils/hooks";

export default createUTC;

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

hooks.utc = createUTC;
