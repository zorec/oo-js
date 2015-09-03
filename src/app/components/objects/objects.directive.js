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
      this.init = function () {
        // TODO: Python, ES6
        this.languages = [new JavaScript(), new Ruby()];
        this.currentLanguageIndex = 0;
        this.randomCount = 3;
        this.generateObjects();
      };

      this.generateObjects = function () {
        this.jsonObjects = objectHelper.randomObjects(this.randomCount);
        objectHelper.chainObjects(this.jsonObjects);
        this.inheritFromIndexes = this.jsonObjects.map(function (item, index) {
          return index - 1;
        });
        this.updateSnippet();
      };

      this.addObject = function() {
        var jsonObject = {};
        this.jsonObjects.push(jsonObject);
        this.inheritFromIndexes.push(-1);
      };

      this.accessibleProperties = function (index) {
        return objectHelper.deepCopy(this.jsonObjects[index]);
      };

      this.isValidPrototype = function (jsonObject, inheritFromIndex) {
        return objectHelper
          .isValidPrototype(jsonObject, this.jsonObjects[inheritFromIndex]);
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
      };

      this.init();
    }

}());
