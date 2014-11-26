export { normalizeUnits, normalizeObjectUnits };

var unitAliases = {
    ms : 'millisecond',
    s : 'second',
    m : 'minute',
    h : 'hour',
    d : 'day',
    D : 'date',
    w : 'week',
    W : 'isoWeek',
    M : 'month',
    Q : 'quarter',
    y : 'year',
    DDD : 'dayOfYear',
    e : 'weekday',
    E : 'isoWeekday',
    gg: 'weekYear',
    GG: 'isoWeekYear'
};

var camelFunctions = {
    dayofyear : 'dayOfYear',
    isoweekday : 'isoWeekday',
    isoweek : 'isoWeek',
    weekyear : 'weekYear',
    isoweekyear : 'isoWeekYear'
};

function normalizeUnits(units) {
    if (units) {
        var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
        units = unitAliases[units] || camelFunctions[lowered] || lowered;
    }
    return units;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}
