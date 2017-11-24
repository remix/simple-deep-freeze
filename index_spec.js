// @flow
'use strict';

var simpleDeepFreeze = require('./index');

describe('simpleDeepFreeze', function() {
  it('deep freezes a simple object structure and returns it', function() {
    var object = {
      someBoolean: true,
      someNumber: 10,
      someString: 'hello!',
      someObject: { foo: 'bar', anotherObject: { nested: 'inObject' } },
      someArray: [false, 20, 'bye!', { nested: 'inArray' }],
    };

    expect(simpleDeepFreeze(object)).toEqual(object);

    expect(Object.isFrozen(object)).toEqual(true);
    expect(Object.isFrozen(object.someObject)).toEqual(true);
    expect(Object.isFrozen(object.someObject.anotherObject)).toEqual(true);
    expect(Object.isFrozen(object.someArray)).toEqual(true);
    object.someArray.forEach(function(value) {
      expect(Object.isFrozen(value)).toEqual(true);
    });
  });

  it('does not recurse down when an object is already frozen', function() {
    var object = {
      someObject: { nested: 'inObject' },
    };
    Object.freeze(object);

    simpleDeepFreeze(object);

    expect(Object.isFrozen(object.someObject)).toEqual(false);
  });

  it('errors for objects that are not plain old Javascript objects', function() {
    expect(function() {
      simpleDeepFreeze(Buffer);
    }).toThrow();
  });
});
