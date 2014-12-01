export { createLocal };

import { createLocalOrUTC } from "./from-anything";

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}
