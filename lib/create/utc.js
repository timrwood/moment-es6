export { createUTC };

import { createLocalOrUTC } from "./from-anything";

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}
