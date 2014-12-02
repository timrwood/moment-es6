import { momentPrototype } from "./constructor";
import { createDuration } from "../duration/create";
import { createLocal } from "../create/local";

momentPrototype.from = function (time, withoutSuffix) {
    return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
};

momentPrototype.fromNow = function (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
};
