import { Moment, momentPrototype } from "../moment/constructor";

momentPrototype.clone = function () {
    return new Moment(this);
};
