/*
"Exports" of this module:
 - language
 - js
 - ruby
*/

var language = {
  name: 'abstract language',
  create: function (name) {
    var self = Object.create(this);
    self.name = name;

    return self;
  },
}

language.getName = function() {
  return this.name;
}

language.snippet = function(objects) {
  return this.blocksSnippet(this.objects2blocks(objects));

}

language.objects2blocks = function(objects) {
  var blocks = [],
    topLevelBlocks,
    currentBlock,
    self = this,
    value;
  // build linear blocks without hierarchy
  blocks = objects.map(function(obj, index) {
    return {
      ref: obj,
      parentBlockIndex: objects.indexOf(Object.getPrototypeOf(obj)),
      variables: Object.keys(obj).map(function(varName) {
        value = obj[varName];
        if (typeof value == 'string') {
          value = '"' + value + '"';
        }
        return self.variable(varName, value);
      }),
      children: []
    };
  });

  // build children relationships
  for (var i = 0, l = blocks.length; i < l; i ++) {
    currentBlock = blocks[i];
    if (currentBlock.parentBlockIndex == -1) {
      continue;
    }
    blocks[currentBlock.parentBlockIndex].children.push(currentBlock);
  }

  topLevelBlocks = blocks.filter(function(block) {
    return block.parentBlockIndex == -1;
  });

  return topLevelBlocks;
};

language.blocksSnippet = function(blocks, prefix) {
  var self = this;
  prefix = prefix || '';
  var oldPrefix = prefix;
  prefix += '  ';
  return blocks.map(function(currentBlock) {
    var blockCode = self.block(function() {
      // join variables with children blocks if present
      if (currentBlock.children.length) {
        currentBlock.variables = currentBlock.variables.concat(
          self.blocksSnippet(currentBlock.children, prefix)
        )
      }
      return currentBlock.variables.map(function(line) {
        return prefix + line;
      }).join('\n');
    });
    // NOTE: what about languages like Python which does not have ending mark?
    // if (lastElement[0] != ' ')  {
    // }
    blockCode[blockCode.length - 1] = oldPrefix + blockCode[blockCode.length - 1];
    return blockCode.join('\n');
  }).join('\n');
}

/* JavaScript */
var js = Object.create(language.create('JavaScript'));

js.variable = function(name, value) {
  return 'var ' + name + ' = ' + value + ';';
};

js.block = function(body) {
  return ['function {', body(), '}'];
}


/* Ruby */
var ruby = Object.create(language.create('Ruby'));

ruby.variable = function(name, value) {
  return name + ' = ' + value;
};

ruby.block = function(body) {
  return ['begin', body(), 'end'];
}

// USAGE OF MODULE:
/*
var blocks = [{a: 'obj1_a'}, {a: 'obj2_a', b: 'obj2_b'}];
console.log(js.snippet(blocks));
console.log(ruby.snippet(blocks));
*/
