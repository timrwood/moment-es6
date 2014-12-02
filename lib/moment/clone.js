import { Moment, momentPrototype } from "./constructor";

momentPrototype.clone = function () {
    return new Moment(this);
};
