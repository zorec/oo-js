(function() {
  'use strict';

  angular.module('ooJS')
    .directive('jsonText', jsonText);

  function jsonText() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
          function into(input) {
            return JSON.parse(input);
          }
          function out(data) {
            return angular.toJson(data);
          }
          ngModel.$parsers.push(into);
          ngModel.$formatters.push(out);

        }
    };
  }
}());
