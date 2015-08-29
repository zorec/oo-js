// "imported" from oo.js:
// - objectModule
// - js
// - ruby
var initialJsonObjects = objectModule.randomObjects();
// var exampleObjects = [{a: 'obj1_a'}, {a: 'obj2_a', b: 'obj2_b'}, {a: 'obj3_a', c: 'obj3_c'}];

// single object holding the whole state of the UI
// including operation changing state
var ui = {
  // get hold of ui elements in order to avoid duplication
  defaultObjectBox: $('#obj'),
  objectsList: $("#objects"),
  addObject: $('#add-object'),
  snippet: $('#snippet'),
  selectLanguage: $('#language'),
  // don't prefetch, use most up to date value
  textareasSelector: '.json-object',

  jsonObjects: initialJsonObjects,
  availableLanguages: [js, ruby],
  currentLanguage: js,
  // rendered (ui) objects
  objectsCount: 0,
}

ui.init = function() {
  // allow to add objects
  ui.addObject.click(function() {
    ui.newObject();
  });

  // TODO: allow to remove object

  // allow sorting of objects
  ui.objectsList.sortable({
    // re-render when order changed
    update:  ui.reorder,
    cursor: 'move',
    connectWith: '#objects'
    //axis: 'x',
    // placeholder: true,
  });
  ui.objectsList.disableSelection();

  ui.selectLanguage.change(function () {
    ui.currentLanguage = ui.availableLanguages[Number(ui.selectLanguage.val())];
    ui.snippet.prop('class', ui.currentLanguage.getName().toLowerCase());
    ui.renderSnippet();
  });
}

ui.render = function() {
  ui.renderObjects();
  ui.renderSnippet();
}

ui.renderObjects = function() {
  // TODO: prototype is not really used, print available properties for each object
  objectModule.chainObjects(ui.jsonObjects);
  for (var i = 0, l = ui.jsonObjects.length; i < l; i ++) {
    ui.newObject(ui.jsonObjects[i], i);
  }
};

ui.renderSnippet = function() {
  ui.snippet.text(ui.currentLanguage.snippet(ui.jsonObjects));
  ui.snippet.each(function(i, block) {
    hljs.highlightBlock(block);
  });
}

ui.reorder = function() {
  // reset
  ui.objectsCount = 0;
  ui.jsonObjects = [];
  var textareas = $(ui.textareasSelector);
  textareas.each(function(index) {
    try {
      ui.jsonObjects.push(JSON.parse($(this).val()));
    }
    catch(err) {
      alert(err);
    }
  });
  ui.renderSnippet();
};

// creates new ui object
ui.newObject = function(jsonObject, index) {
  jsonObject = jsonObject || {};
  ui.objectsCount ++;
  newObject = ui.defaultObjectBox.clone();
  newObject.find('.label').text('Object'+ ui.objectsCount);
  var textarea = newObject.find('.default-json-object');
  textarea.prop('name', 'obj' + ui.objectsCount);
  textarea.prop('class', 'json-object');
  textarea.val(JSON.stringify(jsonObject));
  textarea.change(function (e) {
    try {
      ui.jsonObjects[index] = JSON.parse(textarea.val());
      ui.renderSnippet();
    }
    catch(err) {
      alert(err);
    }
  });
  ui.objectsList.append(newObject);
};

// document ready
$(function() {
  ui.init();
  ui.render();
});






