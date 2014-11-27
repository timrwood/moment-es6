import { localePrototype } from "../constructors/locale";

localePrototype.preparse = localePrototype.postformat = function (string) {
    return string;
};
