# simpleDeepFreeze
[![NPM version](https://badge.fury.io/js/simple-deep-freeze.svg)](http://badge.fury.io/js/simple-deep-freeze)
[![peerDependencies Status](https://david-dm.org/remix/simple-deep-freeze/peer-status.svg)](https://david-dm.org/remix/simple-deep-freeze?type=peer)
[![devDependencies Status](https://david-dm.org/remix/simple-deep-freeze/dev-status.svg)](https://david-dm.org/remix/simple-deep-freeze?type=dev)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Build Status](https://secure.travis-ci.org/remix/simple-deep-freeze.svg)](http://travis-ci.org/remix/simple-deep-freeze)

Recursively `Object.freeze` simple Javascript structures consisting of plain objects, arrays, and primitives. Make your data immutable.

Use `simpleDeepFreeze` when setting your application state to make sure you can use reference equality when determining which parts of your app to update, and to make sure it's always serializable.

## Example
```js
var simpleDeepFreeze = require('simple-deep-freeze');

var obj = { a: { b: 1}, c: [2, 3] };
simpleDeepFreeze(obj);
obj.a.b = 2;
console.log(obj.a.b); // 1
obj.c[0] = 100;
console.log(obj.c[0]); // 2

simpleDeepFreeze(Buffer); // error
simpleDeepFreeze(function() {}); // error
```

In production environments (based on `process.env.NODE_ENV`) we skip freezing to improve performance.

When encountering an object that is already frozen, we assume it has been frozen recursively already. Make sure that this assumption is true by not using libraries that shallow-freeze objects, and by not shallow-freezing objects yourself. We recommend using the following [ESLint](https://eslint.org/) rule:

```js
'no-restricted-properties': ['error', {
  object: 'Object',
  property: 'freeze',
  message: 'Use simpleDeepFreeze instead.',
}]
```

## Why?
Freezing data structures helps with [certain performance optimisations](http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/), such as being able to use reference equality to check if the data structure has not changed, instead of a deep comparison.

Using only plain objects, arrays, and primitives makes it easy to serialize and deserialize data, e.g. using JSON. This is useful to synchronise data between different computers or processes (e.g. persisting data, synchronising between browser windows, and so on).

You could also use `simpleDeepFreeze` as an intermediate step before using a more full-fledged immutability library like [Immutable.js](https://facebook.github.io/immutable-js/). Or if you don't want to use Immutable.js because of [its issues](https://redux.js.org/docs/recipes/UsingImmutableJS.html#what-are-the-issues-with-using-immutablejs).

## Alternatives
- [Immutable.js](https://facebook.github.io/immutable-js/), as mentioned above.
- [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) tries to make sure you're working with immutable data everywhere throughout your application, by overriding methods like `Array.prototype.map`. This is pretty complicated and error-prone. In contrast, we recommend using `simpleDeepFreeze` only at critical touchpoints in your application, such as setting your application state. This gives you largely the same benefit, but without the complexity.
- [deep-freeze](https://github.com/substack/deep-freeze) is very similar but does not enforce simple data structures. People have had a few [issues](https://github.com/substack/deep-freeze/issues?q=) with the library because of this.

## License
[MIT](LICENSE)
