import { module, test } from "qunit";
import moment from "moment";

module('duration');

test('object instantiation', function (assert) {
    var d = moment.duration({
        years: 2,
        months: 3,
        weeks: 2,
        days: 1,
        hours: 8,
        minutes: 9,
        seconds: 20,
        milliseconds: 12
    });

    assert.equal(d.years(),        2,  'years');
    assert.equal(d.months(),       3,  'months');
    assert.equal(d.weeks(),        2,  'weeks');
    assert.equal(d.days(),         15, 'days'); // two weeks + 1 day
    assert.equal(d.hours(),        8,  'hours');
    assert.equal(d.minutes(),      9,  'minutes');
    assert.equal(d.seconds(),      20, 'seconds');
    assert.equal(d.milliseconds(), 12, 'milliseconds');
});

test('object instantiation with strings', function (assert) {
    var d = moment.duration({
        years: '2',
        months: '3',
        weeks: '2',
        days: '1',
        hours: '8',
        minutes: '9',
        seconds: '20',
        milliseconds: '12'
    });

    assert.equal(d.years(),        2,  'years');
    assert.equal(d.months(),       3,  'months');
    assert.equal(d.weeks(),        2,  'weeks');
    assert.equal(d.days(),         15, 'days'); // two weeks + 1 day
    assert.equal(d.hours(),        8,  'hours');
    assert.equal(d.minutes(),      9,  'minutes');
    assert.equal(d.seconds(),      20, 'seconds');
    assert.equal(d.milliseconds(), 12, 'milliseconds');
});

test('milliseconds instantiation', function (assert) {
    assert.equal(moment.duration(72).milliseconds(), 72, 'milliseconds');
});

test('instantiation by type', function (assert) {
    assert.equal(moment.duration(1, 'years').years(),                 1, 'years');
    assert.equal(moment.duration(1, 'y').years(),                     1, 'y');
    assert.equal(moment.duration(2, 'months').months(),               2, 'months');
    assert.equal(moment.duration(2, 'M').months(),                    2, 'M');
    assert.equal(moment.duration(3, 'weeks').weeks(),                 3, 'weeks');
    assert.equal(moment.duration(3, 'w').weeks(),                     3, 'weeks');
    assert.equal(moment.duration(4, 'days').days(),                   4, 'days');
    assert.equal(moment.duration(4, 'd').days(),                      4, 'd');
    assert.equal(moment.duration(5, 'hours').hours(),                 5, 'hours');
    assert.equal(moment.duration(5, 'h').hours(),                     5, 'h');
    assert.equal(moment.duration(6, 'minutes').minutes(),             6, 'minutes');
    assert.equal(moment.duration(6, 'm').minutes(),                   6, 'm');
    assert.equal(moment.duration(7, 'seconds').seconds(),             7, 'seconds');
    assert.equal(moment.duration(7, 's').seconds(),                   7, 's');
    assert.equal(moment.duration(8, 'milliseconds').milliseconds(),   8, 'milliseconds');
    assert.equal(moment.duration(8, 'ms').milliseconds(),             8, 'ms');
});

test('shortcuts', function (assert) {
    assert.equal(moment.duration({y: 1}).years(),         1, 'years = y');
    assert.equal(moment.duration({M: 2}).months(),        2, 'months = M');
    assert.equal(moment.duration({w: 3}).weeks(),         3, 'weeks = w');
    assert.equal(moment.duration({d: 4}).days(),          4, 'days = d');
    assert.equal(moment.duration({h: 5}).hours(),         5, 'hours = h');
    assert.equal(moment.duration({m: 6}).minutes(),       6, 'minutes = m');
    assert.equal(moment.duration({s: 7}).seconds(),       7, 'seconds = s');
    assert.equal(moment.duration({ms: 8}).milliseconds(), 8, 'milliseconds = ms');
});

test('generic getter', function (assert) {
    assert.equal(moment.duration(1, 'years').get('years'),                1, 'years');
    assert.equal(moment.duration(1, 'years').get('year'),                 1, 'years = year');
    assert.equal(moment.duration(1, 'years').get('y'),                    1, 'years = y');
    assert.equal(moment.duration(2, 'months').get('months'),              2, 'months');
    assert.equal(moment.duration(2, 'months').get('month'),               2, 'months = month');
    assert.equal(moment.duration(2, 'months').get('M'),                   2, 'months = M');
    assert.equal(moment.duration(3, 'weeks').get('weeks'),                3, 'weeks');
    assert.equal(moment.duration(3, 'weeks').get('week'),                 3, 'weeks = week');
    assert.equal(moment.duration(3, 'weeks').get('w'),                    3, 'weeks = w');
    assert.equal(moment.duration(4, 'days').get('days'),                  4, 'days');
    assert.equal(moment.duration(4, 'days').get('day'),                   4, 'days = day');
    assert.equal(moment.duration(4, 'days').get('d'),                     4, 'days = d');
    assert.equal(moment.duration(5, 'hours').get('hours'),                5, 'hours');
    assert.equal(moment.duration(5, 'hours').get('hour'),                 5, 'hours = hour');
    assert.equal(moment.duration(5, 'hours').get('h'),                    5, 'hours = h');
    assert.equal(moment.duration(6, 'minutes').get('minutes'),            6, 'minutes');
    assert.equal(moment.duration(6, 'minutes').get('minute'),             6, 'minutes = minute');
    assert.equal(moment.duration(6, 'minutes').get('m'),                  6, 'minutes = m');
    assert.equal(moment.duration(7, 'seconds').get('seconds'),            7, 'seconds');
    assert.equal(moment.duration(7, 'seconds').get('second'),             7, 'seconds = second');
    assert.equal(moment.duration(7, 'seconds').get('s'),                  7, 'seconds = s');
    assert.equal(moment.duration(8, 'milliseconds').get('milliseconds'),  8, 'milliseconds');
    assert.equal(moment.duration(8, 'milliseconds').get('millisecond'),   8, 'milliseconds = millisecond');
    assert.equal(moment.duration(8, 'milliseconds').get('ms'),            8, 'milliseconds = ms');
});

test('instantiation from another duration', function (assert) {
    var simple = moment.duration(1234),
        lengthy = moment.duration(60 * 60 * 24 * 360 * 1e3),
        complicated = moment.duration({
            years: 2,
            months: 3,
            weeks: 4,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        }),
        modified = moment.duration(1, 'day').add(moment.duration(1, 'day'));

    assert.deepEqual(moment.duration(simple), simple, 'simple clones are equal');
    assert.deepEqual(moment.duration(lengthy), lengthy, 'lengthy clones are equal');
    assert.deepEqual(moment.duration(complicated), complicated, 'complicated clones are equal');
    assert.deepEqual(moment.duration(modified), modified, 'cloning modified duration works');
});

test('instantiation from 24-hour time zero', function (assert) {
    assert.equal(moment.duration('00:00').years(), 0, '0 years');
    assert.equal(moment.duration('00:00').days(), 0, '0 days');
    assert.equal(moment.duration('00:00').hours(), 0, '0 hours');
    assert.equal(moment.duration('00:00').minutes(), 0, '0 minutes');
    assert.equal(moment.duration('00:00').seconds(), 0, '0 seconds');
    assert.equal(moment.duration('00:00').milliseconds(), 0, '0 milliseconds');
});

test('instantiation from 24-hour time <24 hours', function (assert) {
    assert.equal(moment.duration('06:45').years(), 0, '0 years');
    assert.equal(moment.duration('06:45').days(), 0, '0 days');
    assert.equal(moment.duration('06:45').hours(), 6, '6 hours');
    assert.equal(moment.duration('06:45').minutes(), 45, '45 minutes');
    assert.equal(moment.duration('06:45').seconds(), 0, '0 seconds');
    assert.equal(moment.duration('06:45').milliseconds(), 0, '0 milliseconds');
});

test('instantiation from 24-hour time >24 hours', function (assert) {
    assert.equal(moment.duration('26:45').years(), 0, '0 years');
    assert.equal(moment.duration('26:45').days(), 1, '0 days');
    assert.equal(moment.duration('26:45').hours(), 2, '2 hours');
    assert.equal(moment.duration('26:45').minutes(), 45, '45 minutes');
    assert.equal(moment.duration('26:45').seconds(), 0, '0 seconds');
    assert.equal(moment.duration('26:45').milliseconds(), 0, '0 milliseconds');
});

test('instatiation from serialized C# TimeSpan zero', function (assert) {
    assert.equal(moment.duration('00:00:00').years(), 0, '0 years');
    assert.equal(moment.duration('00:00:00').days(), 0, '0 days');
    assert.equal(moment.duration('00:00:00').hours(), 0, '0 hours');
    assert.equal(moment.duration('00:00:00').minutes(), 0, '0 minutes');
    assert.equal(moment.duration('00:00:00').seconds(), 0, '0 seconds');
    assert.equal(moment.duration('00:00:00').milliseconds(), 0, '0 milliseconds');
});

test('instatiation from serialized C# TimeSpan with days', function (assert) {
    assert.equal(moment.duration('1.02:03:04.9999999').years(), 0, '0 years');
    assert.equal(moment.duration('1.02:03:04.9999999').days(), 1, '1 day');
    assert.equal(moment.duration('1.02:03:04.9999999').hours(), 2, '2 hours');
    assert.equal(moment.duration('1.02:03:04.9999999').minutes(), 3, '3 minutes');
    assert.equal(moment.duration('1.02:03:04.9999999').seconds(), 4, '4 seconds');
    assert.equal(moment.duration('1.02:03:04.9999999').milliseconds(), 999, '999 milliseconds');
});

test('instatiation from serialized C# TimeSpan without days', function (assert) {
    assert.equal(moment.duration('01:02:03.9999999').years(), 0, '0 years');
    assert.equal(moment.duration('01:02:03.9999999').days(), 0, '0 days');
    assert.equal(moment.duration('01:02:03.9999999').hours(), 1, '1 hour');
    assert.equal(moment.duration('01:02:03.9999999').minutes(), 2, '2 minutes');
    assert.equal(moment.duration('01:02:03.9999999').seconds(), 3, '3 seconds');
    assert.equal(moment.duration('01:02:03.9999999').milliseconds(), 999, '999 milliseconds');

    assert.equal(moment.duration('23:59:59.9999999').days(), 0, '0 days');
    assert.equal(moment.duration('23:59:59.9999999').hours(), 23, '23 hours');

    assert.equal(moment.duration('500:59:59.9999999').days(), 20, '500 hours overflows to 20 days');
    assert.equal(moment.duration('500:59:59.9999999').hours(), 20, '500 hours overflows to 20 hours');
});

test('instatiation from serialized C# TimeSpan without days or milliseconds', function (assert) {
    assert.equal(moment.duration('01:02:03').years(), 0, '0 years');
    assert.equal(moment.duration('01:02:03').days(), 0, '0 days');
    assert.equal(moment.duration('01:02:03').hours(), 1, '1 hour');
    assert.equal(moment.duration('01:02:03').minutes(), 2, '2 minutes');
    assert.equal(moment.duration('01:02:03').seconds(), 3, '3 seconds');
    assert.equal(moment.duration('01:02:03').milliseconds(), 0, '0 milliseconds');
});

test('instatiation from serialized C# TimeSpan without milliseconds', function (assert) {
    assert.equal(moment.duration('1.02:03:04').years(), 0, '0 years');
    assert.equal(moment.duration('1.02:03:04').days(), 1, '1 day');
    assert.equal(moment.duration('1.02:03:04').hours(), 2, '2 hours');
    assert.equal(moment.duration('1.02:03:04').minutes(), 3, '3 minutes');
    assert.equal(moment.duration('1.02:03:04').seconds(), 4, '4 seconds');
    assert.equal(moment.duration('1.02:03:04').milliseconds(), 0, '0 milliseconds');
});

test('instatiation from serialized C# TimeSpan maxValue', function (assert) {
    var d = moment.duration('10675199.02:48:05.4775807');

    assert.equal(d.years(), 29227, '29227 years');
    assert.equal(d.months(), 8, '8 months');
    assert.equal(d.days(), 17, '17 day');  // this should be 13

    assert.equal(d.hours(), 2, '2 hours');
    assert.equal(d.minutes(), 48, '48 minutes');
    assert.equal(d.seconds(), 5, '5 seconds');
    assert.equal(d.milliseconds(), 477, '477 milliseconds');
});

test('instatiation from serialized C# TimeSpan minValue', function (assert) {
    var d = moment.duration('-10675199.02:48:05.4775808');

    assert.equal(d.years(), -29227, '29653 years');
    assert.equal(d.months(), -8, '8 day');
    assert.equal(d.days(), -17, '17 day'); // this should be 13

    assert.equal(d.hours(), -2, '2 hours');
    assert.equal(d.minutes(), -48, '48 minutes');
    assert.equal(d.seconds(), -5, '5 seconds');
    assert.equal(d.milliseconds(), -477, '477 milliseconds');
});

test('instantiation from ISO 8601 duration', function (assert) {
    assert.equal(moment.duration('P1Y2M3DT4H5M6S').asSeconds(), moment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).asSeconds(), 'all fields');
    assert.equal(moment.duration('P1M').asSeconds(), moment.duration({M: 1}).asSeconds(), 'single month field');
    assert.equal(moment.duration('PT1M').asSeconds(), moment.duration({m: 1}).asSeconds(), 'single minute field');
    assert.equal(moment.duration('P1MT2H').asSeconds(), moment.duration({M: 1, h: 2}).asSeconds(), 'random fields missing');
    assert.equal(moment.duration('-P60D').asSeconds(), moment.duration({d: -60}).asSeconds(), 'negative days');
    assert.equal(moment.duration('PT0.5S').asSeconds(), moment.duration({s: 0.5}).asSeconds(), 'fractional seconds');
    assert.equal(moment.duration('PT0,5S').asSeconds(), moment.duration({s: 0.5}).asSeconds(), 'fractional seconds (comma)');
});

test('serialization to ISO 8601 duration strings', function (assert) {
    assert.equal(moment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).toISOString(), 'P1Y2M3DT4H5M6S', 'all fields');
    assert.equal(moment.duration({M: -1}).toISOString(), '-P1M', 'one month ago');
    assert.equal(moment.duration({m: -1}).toISOString(), '-PT1M', 'one minute ago');
    assert.equal(moment.duration({s: -0.5}).toISOString(), '-PT0.5S', 'one half second ago');
    assert.equal(moment.duration({y: -0.5, M: 1}).toISOString(), '-P5M', 'a month after half a year ago');
    assert.equal(moment.duration({}).toISOString(), 'P0D', 'zero duration');
});

test('toString acts as toISOString', function (assert) {
    assert.equal(moment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).toString(), 'P1Y2M3DT4H5M6S', 'all fields');
    assert.equal(moment.duration({M: -1}).toString(), '-P1M', 'one month ago');
    assert.equal(moment.duration({m: -1}).toString(), '-PT1M', 'one minute ago');
    assert.equal(moment.duration({s: -0.5}).toString(), '-PT0.5S', 'one half second ago');
    assert.equal(moment.duration({y: -0.5, M: 1}).toString(), '-P5M', 'a month after half a year ago');
    assert.equal(moment.duration({}).toString(), 'P0D', 'zero duration');
});

test('toIsoString deprecation', function (assert) {
    assert.equal(moment.duration({}).toIsoString(), moment.duration({}).toISOString(), 'toIsoString delegates to toISOString');
});

test('`isodate` (python) test cases', function (assert) {
    assert.equal(moment.duration('P18Y9M4DT11H9M8S').asSeconds(), moment.duration({y: 18, M: 9, d: 4, h: 11, m: 9, s: 8}).asSeconds(), 'python isodate 1');
    assert.equal(moment.duration('P2W').asSeconds(), moment.duration({w: 2}).asSeconds(), 'python isodate 2');
    assert.equal(moment.duration('P3Y6M4DT12H30M5S').asSeconds(), moment.duration({y: 3, M: 6, d: 4, h: 12, m: 30, s: 5}).asSeconds(), 'python isodate 3');
    assert.equal(moment.duration('P23DT23H').asSeconds(), moment.duration({d: 23, h: 23}).asSeconds(), 'python isodate 4');
    assert.equal(moment.duration('P4Y').asSeconds(), moment.duration({y: 4}).asSeconds(), 'python isodate 5');
    assert.equal(moment.duration('P1M').asSeconds(), moment.duration({M: 1}).asSeconds(), 'python isodate 6');
    assert.equal(moment.duration('PT1M').asSeconds(), moment.duration({m: 1}).asSeconds(), 'python isodate 7');
    assert.equal(moment.duration('P0.5Y').asSeconds(), moment.duration({y: 0.5}).asSeconds(), 'python isodate 8');
    assert.equal(moment.duration('PT36H').asSeconds(), moment.duration({h: 36}).asSeconds(), 'python isodate 9');
    assert.equal(moment.duration('P1DT12H').asSeconds(), moment.duration({d: 1, h: 12}).asSeconds(), 'python isodate 10');
    assert.equal(moment.duration('-P2W').asSeconds(), moment.duration({w: -2}).asSeconds(), 'python isodate 11');
    assert.equal(moment.duration('-P2.2W').asSeconds(), moment.duration({w: -2.2}).asSeconds(), 'python isodate 12');
    assert.equal(moment.duration('P1DT2H3M4S').asSeconds(), moment.duration({d: 1, h: 2, m: 3, s: 4}).asSeconds(), 'python isodate 13');
    assert.equal(moment.duration('P1DT2H3M').asSeconds(), moment.duration({d: 1, h: 2, m: 3}).asSeconds(), 'python isodate 14');
    assert.equal(moment.duration('P1DT2H').asSeconds(), moment.duration({d: 1, h: 2}).asSeconds(), 'python isodate 15');
    assert.equal(moment.duration('PT2H').asSeconds(), moment.duration({h: 2}).asSeconds(), 'python isodate 16');
    assert.equal(moment.duration('PT2.3H').asSeconds(), moment.duration({h: 2.3}).asSeconds(), 'python isodate 17');
    assert.equal(moment.duration('PT2H3M4S').asSeconds(), moment.duration({h: 2, m: 3, s: 4}).asSeconds(), 'python isodate 18');
    assert.equal(moment.duration('PT3M4S').asSeconds(), moment.duration({m: 3, s: 4}).asSeconds(), 'python isodate 19');
    assert.equal(moment.duration('PT22S').asSeconds(), moment.duration({s: 22}).asSeconds(), 'python isodate 20');
    assert.equal(moment.duration('PT22.22S').asSeconds(), moment.duration({s: 22.22}).asSeconds(), 'python isodate 21');
    assert.equal(moment.duration('-P2Y').asSeconds(), moment.duration({y: -2}).asSeconds(), 'python isodate 22');
    assert.equal(moment.duration('-P3Y6M4DT12H30M5S').asSeconds(), moment.duration({y: -3, M: -6, d: -4, h: -12, m: -30, s: -5}).asSeconds(), 'python isodate 23');
    assert.equal(moment.duration('-P1DT2H3M4S').asSeconds(), moment.duration({d: -1, h: -2, m: -3, s: -4}).asSeconds(), 'python isodate 24');
});

test('ISO 8601 misuse cases', function (assert) {
    assert.equal(moment.duration('P').asSeconds(), 0, 'lonely P');
    assert.equal(moment.duration('PT').asSeconds(), 0, 'just P and T');
    assert.equal(moment.duration('P1H').asSeconds(), 0, 'missing T');
    assert.equal(moment.duration('P1D1Y').asSeconds(), 0, 'out of order');
    assert.equal(moment.duration('PT.5S').asSeconds(), 0.5, 'accept no leading zero for decimal');
    assert.equal(moment.duration('PT1,S').asSeconds(), 1, 'accept trailing decimal separator');
    assert.equal(moment.duration('PT1M0,,5S').asSeconds(), 60, 'extra decimal separators are ignored as 0');
    assert.equal(moment.duration('P-1DS').asSeconds(), 0, 'wrong position of negative');
});

test('humanize', function (assert) {
    moment.locale('en');
    assert.equal(moment.duration({seconds: 44}).humanize(),  'a few seconds', '44 seconds = a few seconds');
    assert.equal(moment.duration({seconds: 45}).humanize(),  'a minute',      '45 seconds = a minute');
    assert.equal(moment.duration({seconds: 89}).humanize(),  'a minute',      '89 seconds = a minute');
    assert.equal(moment.duration({seconds: 90}).humanize(),  '2 minutes',     '90 seconds = 2 minutes');
    assert.equal(moment.duration({minutes: 44}).humanize(),  '44 minutes',    '44 minutes = 44 minutes');
    assert.equal(moment.duration({minutes: 45}).humanize(),  'an hour',       '45 minutes = an hour');
    assert.equal(moment.duration({minutes: 89}).humanize(),  'an hour',       '89 minutes = an hour');
    assert.equal(moment.duration({minutes: 90}).humanize(),  '2 hours',       '90 minutes = 2 hours');
    assert.equal(moment.duration({hours: 5}).humanize(),     '5 hours',       '5 hours = 5 hours');
    assert.equal(moment.duration({hours: 21}).humanize(),    '21 hours',      '21 hours = 21 hours');
    assert.equal(moment.duration({hours: 22}).humanize(),    'a day',         '22 hours = a day');
    assert.equal(moment.duration({hours: 35}).humanize(),    'a day',         '35 hours = a day');
    assert.equal(moment.duration({hours: 36}).humanize(),    '2 days',        '36 hours = 2 days');
    assert.equal(moment.duration({days: 1}).humanize(),      'a day',         '1 day = a day');
    assert.equal(moment.duration({days: 5}).humanize(),      '5 days',        '5 days = 5 days');
    assert.equal(moment.duration({weeks: 1}).humanize(),     '7 days',        '1 week = 7 days');
    assert.equal(moment.duration({days: 25}).humanize(),     '25 days',       '25 days = 25 days');
    assert.equal(moment.duration({days: 26}).humanize(),     'a month',       '26 days = a month');
    assert.equal(moment.duration({days: 30}).humanize(),     'a month',       '30 days = a month');
    assert.equal(moment.duration({days: 45}).humanize(),     'a month',       '45 days = a month');
    assert.equal(moment.duration({days: 46}).humanize(),     '2 months',      '46 days = 2 months');
    assert.equal(moment.duration({days: 74}).humanize(),     '2 months',      '74 days = 2 months');
    assert.equal(moment.duration({days: 77}).humanize(),     '3 months',      '77 days = 3 months');
    assert.equal(moment.duration({months: 1}).humanize(),    'a month',       '1 month = a month');
    assert.equal(moment.duration({months: 5}).humanize(),    '5 months',      '5 months = 5 months');
    assert.equal(moment.duration({days: 344}).humanize(),    'a year',        '344 days = a year');
    assert.equal(moment.duration({days: 345}).humanize(),    'a year',        '345 days = a year');
    assert.equal(moment.duration({days: 547}).humanize(),    'a year',        '547 days = a year');
    assert.equal(moment.duration({days: 548}).humanize(),    '2 years',       '548 days = 2 years');
    assert.equal(moment.duration({years: 1}).humanize(),     'a year',        '1 year = a year');
    assert.equal(moment.duration({years: 5}).humanize(),     '5 years',       '5 years = 5 years');
    assert.equal(moment.duration(7200000).humanize(),        '2 hours',       '7200000 = 2 minutes');
});

test('humanize duration with suffix', function (assert) {
    moment.locale('en');
    assert.equal(moment.duration({seconds:  44}).humanize(true),  'in a few seconds', '44 seconds = a few seconds');
    assert.equal(moment.duration({seconds: -44}).humanize(true),  'a few seconds ago', '44 seconds = a few seconds');
});

test('bubble value up', function (assert) {
    assert.equal(moment.duration({milliseconds: 61001}).milliseconds(), 1, '61001 milliseconds has 1 millisecond left over');
    assert.equal(moment.duration({milliseconds: 61001}).seconds(),      1, '61001 milliseconds has 1 second left over');
    assert.equal(moment.duration({milliseconds: 61001}).minutes(),      1, '61001 milliseconds has 1 minute left over');

    assert.equal(moment.duration({minutes: 350}).minutes(), 50, '350 minutes has 50 minutes left over');
    assert.equal(moment.duration({minutes: 350}).hours(),   5,  '350 minutes has 5 hours left over');
});

test('clipping', function (assert) {
    assert.equal(moment.duration({months: 11}).months(), 11, '11 months is 11 months');
    assert.equal(moment.duration({months: 11}).years(),  0,  '11 months makes no year');
    assert.equal(moment.duration({months: 12}).months(), 0,  '12 months is 0 months left over');
    assert.equal(moment.duration({months: 12}).years(),  1,  '12 months makes 1 year');
    assert.equal(moment.duration({months: 13}).months(), 1,  '13 months is 1 month left over');
    assert.equal(moment.duration({months: 13}).years(),  1,  '13 months makes 1 year');

    assert.equal(moment.duration({days: 29}).days(),   29, '29 days is 29 days');
    assert.equal(moment.duration({days: 29}).months(), 0,  '29 days makes no month');
    assert.equal(moment.duration({days: 30}).days(),   0,  '30 days is 0 days left over');
    assert.equal(moment.duration({days: 30}).months(), 1,  '30 days is a month');
    assert.equal(moment.duration({days: 31}).days(),   1,  '31 days is 1 day left over');
    assert.equal(moment.duration({days: 31}).months(), 1,  '31 days is a month');

    assert.equal(moment.duration({hours: 23}).hours(), 23, '23 hours is 23 hours');
    assert.equal(moment.duration({hours: 23}).days(),  0,  '23 hours makes no day');
    assert.equal(moment.duration({hours: 24}).hours(), 0,  '24 hours is 0 hours left over');
    assert.equal(moment.duration({hours: 24}).days(),  1,  '24 hours makes 1 day');
    assert.equal(moment.duration({hours: 25}).hours(), 1,  '25 hours is 1 hour left over');
    assert.equal(moment.duration({hours: 25}).days(),  1,  '25 hours makes 1 day');
});

test('effective equivalency', function (assert) {
    assert.deepEqual(moment.duration({seconds: 1})._data,  moment.duration({milliseconds: 1000})._data, '1 second is the same as 1000 milliseconds');
    assert.deepEqual(moment.duration({seconds: 60})._data, moment.duration({minutes: 1})._data,         '1 minute is the same as 60 seconds');
    assert.deepEqual(moment.duration({minutes: 60})._data, moment.duration({hours: 1})._data,           '1 hour is the same as 60 minutes');
    assert.deepEqual(moment.duration({hours: 24})._data,   moment.duration({days: 1})._data,            '1 day is the same as 24 hours');
    assert.deepEqual(moment.duration({days: 7})._data,     moment.duration({weeks: 1})._data,           '1 week is the same as 7 days');
    assert.deepEqual(moment.duration({days: 30})._data,    moment.duration({months: 1})._data,          '1 month is the same as 30 days');
    assert.deepEqual(moment.duration({months: 12})._data,  moment.duration({years: 1})._data,           '1 years is the same as 12 months');
});

test('asGetters', function (assert) {
    var d = moment.duration({
        years: 2,
        months: 3,
        weeks: 2,
        days: 1,
        hours: 8,
        minutes: 9,
        seconds: 20,
        milliseconds: 12
    });

    // These are of course very fragile. Their existence merely hints that
    // changing the way 'as' works changes the output.
    assert.equal(d.asYears().toFixed(2),          '2.29', 'years');
    assert.equal(d.asMonths().toFixed(2),        '27.50', 'months');
    assert.equal(d.asWeeks().toFixed(2),        '119.59', 'weeks');
    assert.equal(d.asDays().toFixed(2),         '837.14', 'days');
    assert.equal(d.asHours().toFixed(2),      '20091.25', 'hours');
    assert.equal(d.asMinutes().toFixed(2),  '1205475.03', 'minutes');
    assert.equal(d.asSeconds().toFixed(2), '72328502.01', 'seconds');
    assert.equal(d.asMilliseconds(),         72328502012, 'milliseconds');
});

test('generic as getter', function (assert) {
    var d = moment.duration({
        years: 2,
        months: 3,
        weeks: 2,
        days: 1,
        hours: 8,
        minutes: 9,
        seconds: 20,
        milliseconds: 12
    });

    // These are of course very fragile. Their existence merely hints that
    // changing the way 'as' works changes the output.
    assert.equal(d.as('years').toFixed(2),          '2.29', 'years');
    assert.equal(d.as('year').toFixed(2),           '2.29', 'years = year');
    assert.equal(d.as('y').toFixed(2),              '2.29', 'years = y');
    assert.equal(d.as('months').toFixed(2),         '27.50', 'months');
    assert.equal(d.as('month').toFixed(2),          '27.50', 'months = month');
    assert.equal(d.as('M').toFixed(2),              '27.50', 'months = M');
    assert.equal(d.as('weeks').toFixed(2),          '119.59', 'weeks');
    assert.equal(d.as('week').toFixed(2),           '119.59', 'weeks = week');
    assert.equal(d.as('w').toFixed(2),              '119.59', 'weeks = w');
    assert.equal(d.as('days').toFixed(2),           '837.14', 'days');
    assert.equal(d.as('day').toFixed(2),            '837.14', 'days = day');
    assert.equal(d.as('d').toFixed(2),              '837.14', 'days = d');
    assert.equal(d.as('hours').toFixed(2),          '20091.25', 'hours');
    assert.equal(d.as('hour').toFixed(2),           '20091.25', 'hours = hour');
    assert.equal(d.as('h').toFixed(2),              '20091.25', 'hours = h');
    assert.equal(d.as('minutes').toFixed(2),        '1205475.03', 'minutes');
    assert.equal(d.as('minute').toFixed(2),         '1205475.03', 'minutes = minute');
    assert.equal(d.as('m').toFixed(2),              '1205475.03', 'minutes = m');
    assert.equal(d.as('seconds').toFixed(2),        '72328502.01', 'seconds');
    assert.equal(d.as('second').toFixed(2),         '72328502.01', 'seconds = second');
    assert.equal(d.as('s').toFixed(2),              '72328502.01', 'seconds = s');
    assert.equal(d.as('milliseconds'),              72328502012, 'milliseconds');
    assert.equal(d.as('millisecond'),               72328502012, 'milliseconds = millisecond');
    assert.equal(d.as('ms'),                        72328502012, 'milliseconds = ms');
});

test('as getters for small units', function (assert) {
    var dS = moment.duration(1, 'milliseconds'),
        ds = moment.duration(3, 'seconds'),
        dm = moment.duration(13, 'minutes');

    // Tests for issue #1867.
    // Floating point errors for small duration units were introduced in version 2.8.0.
    assert.equal(dS.as('milliseconds'), 1, 'as("milliseconds")');
    assert.equal(dS.asMilliseconds(),   1, 'asMilliseconds()');
    assert.equal(ds.as('seconds'),      3, 'as("seconds")');
    assert.equal(ds.asSeconds(),        3, 'asSeconds()');
    assert.equal(dm.as('minutes'),      13, 'as("minutes")');
    assert.equal(dm.asMinutes(),        13, 'asMinutes()');
});

test('isDuration', function (assert) {
    assert.ok(moment.isDuration(moment.duration(12345678)), 'correctly says true');
    assert.ok(!moment.isDuration(moment()), 'moment object is not a duration');
    assert.ok(!moment.isDuration({milliseconds: 1}), 'plain object is not a duration');
});

test('add', function (assert) {
    var d = moment.duration({months: 4, weeks: 3, days: 2});
    // for some reason, d._data._months does not get updated; use d._months instead.
    assert.equal(d.add(1, 'month')._months, 5, 'Add months');
    assert.equal(d.add(5, 'days')._days, 28, 'Add days');
    assert.equal(d.add(10000)._milliseconds, 10000, 'Add milliseconds');
    assert.equal(d.add({h: 23, m: 59})._milliseconds, 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 10000, 'Add hour:minute');
});

test('add and bubble', function (assert) {
    assert.equal(moment.duration(1, 'second').add(1000, 'milliseconds').seconds(), 2, 'Adding milliseconds should bubble up to seconds');
    assert.equal(moment.duration(1, 'minute').add(60, 'second').minutes(), 2, 'Adding seconds should bubble up to minutes');
    assert.equal(moment.duration(1, 'hour').add(60, 'minutes').hours(), 2, 'Adding minutes should bubble up to hours');
    assert.equal(moment.duration(1, 'day').add(24, 'hours').days(), 2, 'Adding hours should bubble up to days');
});

test('subtract and bubble', function (assert) {
    assert.equal(moment.duration(2, 'second').subtract(1000, 'milliseconds').seconds(), 1, 'Subtracting milliseconds should bubble up to seconds');
    assert.equal(moment.duration(2, 'minute').subtract(60, 'second').minutes(), 1, 'Subtracting seconds should bubble up to minutes');
    assert.equal(moment.duration(2, 'hour').subtract(60, 'minutes').hours(), 1, 'Subtracting minutes should bubble up to hours');
    assert.equal(moment.duration(2, 'day').subtract(24, 'hours').days(), 1, 'Subtracting hours should bubble up to days');
});

test('subtract', function (assert) {
    var d = moment.duration({months: 2, weeks: 2, days: 0, hours: 5});
    // for some reason, d._data._months does not get updated; use d._months instead.
    assert.equal(d.subtract(1, 'months')._months, 1, 'Subtract months');
    assert.equal(d.subtract(14, 'days')._days, 0, 'Subtract days');
    assert.equal(d.subtract(10000)._milliseconds, 5 * 60 * 60 * 1000 - 10000, 'Subtract milliseconds');
    assert.equal(d.subtract({h: 1, m: 59})._milliseconds, 3 * 60 * 60 * 1000 + 1 * 60 * 1000 - 10000, 'Subtract hour:minute');
});
