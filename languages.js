// ########################################################
// INHERITANCE
// ########################################################
// 1. objects caninherit directly from other objects

// This example illustrates lexical scoping
// Scopes can be nested and variables can be defined on each scope
// e.g.
// var a = 'global scope',
//   b = 'only ' + a;
// function scopingExample() {
//  var a = 'function scope',
//    b = 'defined on the ' + a;
//  (function() {
//    var a = 'immediately invoced function scope',
//      b = 'only ' + a;
//  }());
// }
// scopingExample();

globalScope = {a: 'global scope'};
var functionScope = Object.create(globalScope)
functionScope.a = 'function scope';
functionScope.b = 'defined on the ' + functionScope.a;

var lastScope = Object.create(functionScope);
lastScope.a = 'immediately invoced function scope';
lastScope.c = 'only ' + lastScope.a;

var items = [globalScope, functionScope, lastScope];
// show accessible variables on each scope
for (var i = 0, l = items.length; i < l; i ++) {
  var currentScope = items[i];
  console.log(i);
  for (var prop in currentScope) {
    console.log(currentScope[prop]);
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
  return 'var ' + name + ' = ' + value;
}
Javascript.prototype.if = function() {
  var cond = 'condition';
  return 'if (' + cond + ') {\n' +
   '  // code to execute \n' +
   '}\n';
};
console.log(js.variable('concept', 'polymorphism'));
console.log(js['if']());

console.log(ruby.getName());
Ruby.prototype.variable = function(name, value) {
  return name + ' = ' + value;
};
Ruby.prototype.if = function(varName) {
  return 'if cond\n' +
    '  # code to execute\n' +
    'end\n'
}

console.log(ruby.variable('concept', 'polymorphism'));
console.log(ruby['if']());
