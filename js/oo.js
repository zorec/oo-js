// polyfill
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

var objectModule = {
  // accepts an array of objects whose prototypes are chained chained
  // every object inherits from all preceeding ones
  chainObjects: function(objects) {
    // first object inherits nothing
    var previousPrototype = null;
    for (var i = 0, l = objects.length; i < l; i ++) {
      Object.setPrototypeOf(objects[i], previousPrototype);
      previousPrototype = objects[i];
    }
  },
  PROPERTIES: "abcdefghijklmnopqrstuvwxyz",
  MAX_PROPERTIES_COUNT: 6,
  MAX_VALUE: 100,
  OBJECTS_COUNT: 3,
  randomObjects: function(count) {
    // TODO: only for dubugging
    var l = this.randomNumber(3 || count || this.OBJECTS_COUNT, 2),
      arr = [];
    for (var i = 0; i < l; i ++) {
      arr.push(this.randomObject());
    }
    return arr;
  },
  randomObject: function() {
    // random number 0-6
    var maxPropertiesCount = this.randomNumber(this.MAX_PROPERTIES_COUNT, 1),
      propertiesCount = this.PROPERTIES.length - 1,
      randomObject = {}, randomProperty, randomValue;
    for (var i = 0; i < maxPropertiesCount; i ++) {
      randomProperty = this.PROPERTIES[this.randomNumber(propertiesCount)];
      randomValue = this.randomNumber(this.MAX_VALUE);
      randomObject[randomProperty] = randomValue;
    }
    return randomObject;
  },
  randomNumber(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

// usage of module
var globalBlock = {a: 'global block'},
  functionBlock = {a: 'function block', b: 'inside whole function block'},
  lastBlock = {a: 'immediately invoked function', c: 'only last block'};

var items = [globalBlock, functionBlock, lastBlock];
objectModule.chainObjects(items);

// ########################################################
// INHERITANCE
// ########################################################
// 1. objects can inherit directly from other objects

/*
Simplified example for presentation

This example illustrates lexical scoping:
Programming languages's blocks can be nested and variables can be defined on each block
e.g.
var a = 'global block',
  b = 'only ' + a;
function scopingExample() {
 var a = 'function block',
   b = 'inside whole ' + a;
 (function() {
   var a = 'immediately invoced function block',
     b = 'only ' + a;
 }());
}
scopingExample();

globalBlock = {a: 'global block'};
var functionBlock = Object.create(globalBlock)
functionBlock.a = 'function block';
functionBlock.b = 'inside whole ' + functionBlock.a;

var lastBlock = Object.create(functionBlock);
lastBlock.a = 'immediately invoked function block';
lastBlock.c = 'only ' + lastBlock.a;
*/

// show accessible variables on each block
for (var i = 0, l = items.length; i < l; i ++) {
  var currentBlock = items[i];
  console.log(i);
  for (var prop in currentBlock) {
    console.log(currentBlock[prop]);
  }
}

// 2. inheritance with use of constructor pattern
var Language = function(name) {
  this.name = name;
}
Language.prototype.getName = function() {
  return this.name;
}

var Javascript = function() {
  Language.call(this, 'Javascript');
}
Javascript.prototype = Object.create(Language.prototype);

function Ruby() {
  Language.call(this, 'Ruby');
}
Ruby.prototype = Object.create(Language.prototype);

var js = new Javascript();
var ruby = new Ruby();

// 3. multiple inheritance or mixin pattern
// It could be used to illustrate either 1. language paradigms or 2. language history
// 1. JS is multi-paradigm language combining functional, OO and imperative paradigm
// 2. JS's ancestors (that is languages that it is influenced by) are Scheme, Self and C language
// TODO: I don't know if there wil be enough time left to explain this example
// I'll do it at the end after I will finish other examples


// ########################################################
// POLYMOPRHISM
// ########################################################
console.log(js.getName());
Javascript.prototype.variable = function(name, value) {
  return 'var ' + name + ' = ' + value + ';';
}
Javascript.prototype.if = function(cond, body) {
  var cond = 'condition';
  return 'if (' + cond + ') {\n' +
   '  // code to execute \n' +
   '}\n';
};
Javascript.prototype.block = function(body) {
  return ['function() {', body(), '}'].join('\n');
}
console.log(js.variable('concept', 'polymorphism'));
console.log(js.if());

console.log(ruby.getName());
Ruby.prototype.variable = function(name, value) {
  // TODO: missing string quotes ""
  return name + ' = ' + value;
};
Ruby.prototype.if = function(cond, body) {
  return 'if cond\n' +
    '  # code to execute\n' +
    'end\n';
}
Ruby.prototype.block = function(body) {
  return ['begin', body(), 'end'].join('\n');
}

console.log(ruby.variable('concept', 'polymorphism'));
console.log(ruby.if());

Language.prototype.snippet = function(objects) {
  var levels = [],
    self = this,
//    currentObject = object,
    level, previousObject;

  /*
  {
    // TODO: add polyfill or replace with hasOwnPropery
    level = {
      ref: currentObject,
      variables: Object.keys(currentObject),
    };
    levels.push(level);

    currentObject = Object.getPrototypeOf(currentObject);
    // go up protype chain
  } while (currentObject != null);
 */
  var levels = objects.map(function(obj) {
    return {ref: obj, variables: Object.keys(obj)}
  });

  previousObject = {body: ''}
  // iterate in reverse
  for (var i = levels.length - 1; i >= 0; i --) {
    currentObject = levels[i];
    currentObject.variables = currentObject.variables.map(function(varName) {
      return self.variable(varName, currentObject.ref[varName]);
    }).join('\n');
    currentObject.body = self.block(function() {
      return [currentObject.variables, previousObject.body].join('\n');
    });
    previousObject = currentObject;
  }

  // TODO: code indentation!
  return currentObject.body;
};

// console.log(js.snippet(items));
