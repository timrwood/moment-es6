var i,
    formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
    localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
    // tokens to ordinalize and pad
    ordinalizeTokens = 'DDD w W M D d'.split(' '),
    paddedTokens = 'M D H h m s w W'.split(' '),
    // format function strings
    formatFunctions = {},
    formatTokenFunctions = {
        M    : function () {
            return this.month() + 1;
        },
        MMM  : function (format) {
            return this.localeData().monthsShort(this, format);
        },
        MMMM : function (format) {
            return this.localeData().months(this, format);
        },
        D    : function () {
            return this.date();
        },
        DDD  : function () {
            return this.dayOfYear();
        },
        d    : function () {
            return this.day();
        },
        dd   : function (format) {
            return this.localeData().weekdaysMin(this, format);
        },
        ddd  : function (format) {
            return this.localeData().weekdaysShort(this, format);
        },
        dddd : function (format) {
            return this.localeData().weekdays(this, format);
        },
        w    : function () {
            return this.week();
        },
        W    : function () {
            return this.isoWeek();
        },
        YY   : function () {
            return leftZeroFill(this.year() % 100, 2);
        },
        YYYY : function () {
            return leftZeroFill(this.year(), 4);
        },
        YYYYY : function () {
            return leftZeroFill(this.year(), 5);
        },
        YYYYYY : function () {
            var y = this.year(), sign = y >= 0 ? '+' : '-';
            return sign + leftZeroFill(Math.abs(y), 6);
        },
        gg   : function () {
            return leftZeroFill(this.weekYear() % 100, 2);
        },
        gggg : function () {
            return leftZeroFill(this.weekYear(), 4);
        },
        ggggg : function () {
            return leftZeroFill(this.weekYear(), 5);
        },
        GG   : function () {
            return leftZeroFill(this.isoWeekYear() % 100, 2);
        },
        GGGG : function () {
            return leftZeroFill(this.isoWeekYear(), 4);
        },
        GGGGG : function () {
            return leftZeroFill(this.isoWeekYear(), 5);
        },
        e : function () {
            return this.weekday();
        },
        E : function () {
            return this.isoWeekday();
        },
        a    : function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), true);
        },
        A    : function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), false);
        },
        H    : function () {
            return this.hours();
        },
        h    : function () {
            return this.hours() % 12 || 12;
        },
        m    : function () {
            return this.minutes();
        },
        s    : function () {
            return this.seconds();
        },
        S    : function () {
            return toInt(this.milliseconds() / 100);
        },
        SS   : function () {
            return leftZeroFill(toInt(this.milliseconds() / 10), 2);
        },
        SSS  : function () {
            return leftZeroFill(this.milliseconds(), 3);
        },
        SSSS : function () {
            return leftZeroFill(this.milliseconds(), 3);
        },
        Z    : function () {
            var a = -this.zone(),
                b = '+';
            if (a < 0) {
                a = -a;
                b = '-';
            }
            return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
        },
        ZZ   : function () {
            var a = -this.zone(),
                b = '+';
            if (a < 0) {
                a = -a;
                b = '-';
            }
            return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
        },
        z : function () {
            return this.zoneAbbr();
        },
        zz : function () {
            return this.zoneName();
        },
        X    : function () {
            return this.unix();
        },
        Q : function () {
            return this.quarter();
        }
    };

function padToken(func, count) {
    return function (a) {
        return leftZeroFill(func.call(this, a), count);
    };
}

function ordinalizeToken(func, period) {
    return function (a) {
        return this.localeData().ordinal(func.call(this, a), period);
    };
}

while (ordinalizeTokens.length) {
    i = ordinalizeTokens.pop();
    formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
}
while (paddedTokens.length) {
    i = paddedTokens.pop();
    formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
}
formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);

// left zero fill a number
// see http://jsperf.com/left-zero-filling for performance comparison
function leftZeroFill(number, targetLength, forceSign) {
    var output = '' + Math.abs(number),
        sign = number >= 0;

    while (output.length < targetLength) {
        output = '0' + output;
    }
    return (sign ? (forceSign ? '+' : '') : '-') + output;
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        if (coercedNumber >= 0) {
            value = Math.floor(coercedNumber);
        } else {
            value = Math.ceil(coercedNumber);
        }
    }

    return value;
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '';
        for (i = 0; i < length; i++) {
            output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());

    if (!formatFunctions[format]) {
        formatFunctions[format] = makeFormatFunction(format);
    }

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

export { formatMoment, expandFormat, formatTokenFunctions };
