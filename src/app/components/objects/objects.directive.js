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

    function ObjectsController (objectHelper) {
      this.jsonObjects = objectHelper.randomObjects();
      objectHelper.chainObjects(this.jsonObjects);
      this.inheritFromIndexes = this.jsonObjects.map(function (item, index) {
        return index - 1;
      });

      this.addObject = function() {
        this.jsonObjects.push({});
      };

      this.accessibleProperties = function (jsonObject) {
        return objectHelper.deepCopy(jsonObject);
      };

      this.changePrototype = function (changedIndex) {
        var currentValue = Number(this.inheritFromIndexes[changedIndex]),
          inheritFrom = Object;

        if (currentValue != -1) {
          inheritFrom = this.jsonObjects[currentValue];
        }

        Object.setPrototypeOf(this.jsonObjects[changedIndex], inheritFrom);
      };


      // TODO: Python, ES6
      this.languages = [new JavaScript(), new Ruby()];
      this.currentLanguageIndex = 0;
      this.changeLanguage = function () {
        this.currentLanguage = this.languages[this.currentLanguageIndex];
        this.snippet = this.currentLanguage.snippet(this.jsonObjects);
        // TODO: syntax highlighting
        // ui.snippet.each(function(i, block) {
        //   hljs.highlightBlock(block);
        // });
      };
     this.changeLanguage();
    }

}());
