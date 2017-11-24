'use strict';

module.exports = function simpleDeepFreeze(object) {
  // No freezing in production (for better performance).
  try {
    if (process.env.NODE_ENV === 'production') {
      return object;
    }
  } catch (e) {}

  // When already frozen, we assume its children are frozen (for better performance).
  // This should be true if you always use `simpleDeepFreeze` to freeze objects,
  // which is why you should have a linter rule that prevents you from using
  // `Object.freeze` standalone.
  //
  // Note that Object.isFrozen will also return `true` for primitives (numbers,
  // strings, booleans, undefined, null), so there is no need to check for
  // those explicitly.
  if (Object.isFrozen(object)) {
    return object;
  }

  if (!Array.isArray(object) && Object.getPrototypeOf(object) !== Object.getPrototypeOf({})) {
    throw new Error('simpleDeepFreeze only supports plain objects, arrays, and primitives');
  }

  // At this point we know that we're dealing with either an array or plain object, so
  // just freeze it and recurse on its values.
  Object.freeze(object);
  Object.keys(object).forEach(function(key) {
    simpleDeepFreeze(object[key]);
  });

  return object;
};
