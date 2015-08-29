var Language = function(name) {
  this.name = name;
}
Language.prototype.getName = function() {
  return this.name;
}

Language.prototype.snippet = function(objects) {
  var levels = [],
    self = this,
    level, previousObject;

  levels = objects.map(function(obj) {
    return {ref: obj, variables: Object.keys(obj)}
  });

  previousObject = {body: ''}
  // iterate in reverse and build whole program
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


/* JavaScript */
var JavaScript = function() {
  Language.call(this, 'JavaScript');
}
JavaScript.prototype = Object.create(Language.prototype);

JavaScript.prototype.variable = function(name, value) {
  return 'var ' + name + ' = ' + value + ';';
}

JavaScript.prototype.block = function(body) {
  return ['function() {', body(), '}'].join('\n');
}

JavaScript.prototype.if = function(cond, body) {
  var cond = 'condition';
  return 'if (' + cond + ') {\n' +
   '  // code to execute \n' +
   '}\n';
};

/* Ruby */
function Ruby() {
  Language.call(this, 'Ruby');
}
Ruby.prototype = Object.create(Language.prototype);

Ruby.prototype.variable = function(name, value) {
  // TODO: missing string quotes ""
  return name + ' = ' + value;
};

Ruby.prototype.block = function(body) {
  return ['begin', body(), 'end'].join('\n');
}

Ruby.prototype.if = function(cond, body) {
  return 'if cond\n' +
    '  # code to execute\n' +
    'end\n';
}

// USAGE OF MODULE:
var js = new JavaScript();
var ruby = new Ruby();

var blocks = [{a: 'obj1_a'}, {a: 'obj2_a', b: 'obj2_b'}];
console.log(js.snippet(blocks));
console.log(ruby.snippet(blocks));

