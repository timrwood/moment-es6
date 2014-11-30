export { configFromStringAndFormat };

import { configFromISO } from "./from-string";
import { configFromArray } from "./from-array";
import { getParseRegexForToken }   from "../parse/regex";
import { addTimeToArrayFromToken } from "../parse/token";
import { expandFormat, formatTokenFunctions, formattingTokens } from "../format/format";
import checkOverflow from "./check-overflow";
import { HOUR } from "../units/constants";
import { hooks } from "../utils/hooks";

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }

    config._a = [];
    config._pf.empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                config._pf.unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                config._pf.empty = false;
            }
            else {
                config._pf.unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            config._pf.unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    config._pf.charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        config._pf.unusedInput.push(string);
    }

    // handle am pm
    if (config._isPm && config._a[HOUR] < 12) {
        config._a[HOUR] += 12;
    }
    // if is 12 am, change hours to 0
    if (config._isPm === false && config._a[HOUR] === 12) {
        config._a[HOUR] = 0;
    }

    configFromArray(config);
    checkOverflow(config);
}
