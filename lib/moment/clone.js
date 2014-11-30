import { Moment, momentPrototype } from "../constructors/moment";

momentPrototype().clone = function () {
    return new Moment(this, true);
};
