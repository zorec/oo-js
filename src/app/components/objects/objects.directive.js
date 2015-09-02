angular.module('ooJS')
  .directive('objects', function () {
    return {
      templateUrl: './objects.html',
      controller: objectsController,
      controllerAs: 'o'
    }
  });


  function objectsController () {
    this.jsonObjects = objectHelper.randomObjects();

  }
