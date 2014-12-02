// Side effect imports
import "./calendar";
import "./formats";
import "./invalid";
import "./ordinal";
import "./pre-post-format";
import "./relative";
import "./set";

import {
    getSetGlobalLocale,
    defineLocale,
    getLocale
} from "./locales";

import {
    listMonths,
    listMonthsShort,
    listWeekdays,
    listWeekdaysShort,
    listWeekdaysMin
} from "./lists";

export {
    getSetGlobalLocale,
    defineLocale,
    getLocale,
    listMonths,
    listMonthsShort,
    listWeekdays,
    listWeekdaysShort,
    listWeekdaysMin
};

import { deprecate } from "../utils/deprecate";
import { hooks } from "../utils/hooks";

hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

import "./en";
