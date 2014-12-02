// Side effect imports
import "./add-subtract";
import "./calendar";
import "./clone";
import "./compare";
import "./diff";
import "./format";
import "./from";
import "./locale";
import "./start-end-of";
import "./to-type";
import "./valid";

import { createLocal } from "../create/local";
import { createUTC } from "../create/utc";
import { createInvalid } from "../create/valid";
import { isMoment, momentPrototype } from "./constructor";
import { min, max } from "./min-max";

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

export {
    min,
    max,
    isMoment,
    createUTC,
    createUnix,
    createLocal,
    createInZone,
    createInvalid,
    momentPrototype
};
