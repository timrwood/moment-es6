import { createLocalOrUTC } from "./from-anything";

export default function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}
