import { localePrototype } from "../locale/constructor";

localePrototype.preparse = localePrototype.postformat = function (string) {
    return string;
};
