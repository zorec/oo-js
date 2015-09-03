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
          try {
            input =  JSON.parse(input);
            ngModel.$setValidity('json', true);
            return input;
          } catch (err) {
            ngModel.$setValidity('json', false);
            // assume no value changed
            return ngModel.$modelValue;
          }
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
