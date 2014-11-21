import { module, test } from "qunit";
import moment from "moment";

module('invalid', {
    setup : function () {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
    }
});

test('invalid', function (assert) {
    var m = moment.invalid();
    assert.equal(m.isValid(), false);
    assert.equal(m.parsingFlags().userInvalidated, true);
    assert.ok(isNaN(m.valueOf()));
});

test('invalid with existing flag', function (assert) {
    var m = moment.invalid({invalidMonth : 'whatchamacallit'});
    assert.equal(m.isValid(), false);
    assert.equal(m.parsingFlags().userInvalidated, false);
    assert.equal(m.parsingFlags().invalidMonth, 'whatchamacallit');
    assert.ok(isNaN(m.valueOf()));
});

test('invalid with custom flag', function (assert) {
    var m = moment.invalid({tooBusyWith : 'reiculating splines'});
    assert.equal(m.isValid(), false);
    assert.equal(m.parsingFlags().userInvalidated, false);
    assert.equal(m.parsingFlags().tooBusyWith, 'reiculating splines');
    assert.ok(isNaN(m.valueOf()));
});
