import { localePrototype } from "./constructor";

localePrototype.preparse = localePrototype.postformat = function (string) {
    return string;
};
