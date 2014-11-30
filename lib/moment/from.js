import { momentPrototype } from "../moment/constructor";
import moment from "../moment"; // TODO: Find a better way of referencing moment() and moment.duration()

momentPrototype().from = function (time, withoutSuffix) {
    return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
};

momentPrototype().fromNow = function (withoutSuffix) {
    return this.from(moment(), withoutSuffix);
};
