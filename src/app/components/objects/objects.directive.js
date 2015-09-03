(function() {
  'use strict';

  angular.module('ooJS')
    .directive('objects', objects);

    function objects () {
      return {
        templateUrl: 'app/components/objects/objects.html',
        controller: ObjectsController,
        controllerAs: 'o'
      };
    }

    function ObjectsController (objectHelper, Ruby, JavaScript) {
      this.jsonObjects = objectHelper.randomObjects();
      objectHelper.chainObjects(this.jsonObjects);
      this.inheritFromIndexes = this.jsonObjects.map(function (item, index) {
        return index - 1;
      });
      // TODO: Python, ES6
      this.languages = [new JavaScript(), new Ruby()];
      this.currentLanguageIndex = 0;

      this.addObject = function() {
        this.jsonObjects.push({});
      };

      this.accessibleProperties = function (index) {
        return objectHelper.deepCopy(this.jsonObjects[index]);
      };

      this.isValidPrototype = function (jsonObject, inheritFromIndex) {
        var backupPrototype = Object.getPrototypeOf(jsonObject),
          isValid = true;

        try {
          Object.setPrototypeOf(jsonObject, this.jsonObjects[inheritFromIndex]);
        }
        catch (err) {
          // probably cycle in prototype chain
          isValid = false;
        }

        Object.setPrototypeOf(jsonObject, backupPrototype);
        return isValid;
      };

      this.changePrototype = function (changedIndex) {
        var currentValue = Number(this.inheritFromIndexes[changedIndex]),
          inheritFrom = Object;

        if (currentValue !== -1) {
          inheritFrom = this.jsonObjects[currentValue];
        }

        Object.setPrototypeOf(this.jsonObjects[changedIndex], inheritFrom);
      };

      this.updateSnippet = function (index, jsonObject) {
        if (typeof index !== 'undefined') {
          angular.extend(this.jsonObjects[index], jsonObject);
          this.changePrototype(index);
        }
        this.currentLanguage = this.languages[this.currentLanguageIndex];
        this.snippet = this.currentLanguage.snippet(this.jsonObjects);
        // TODO: syntax highlighting
        // ui.snippet.each(function(i, block) {
        //   hljs.highlightBlock(block);
        // });
      };
    }

}());
