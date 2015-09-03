/* global objectHelper:false, toastr:false, moment:false,
   Ruby: false, JavaScript: false */
(function() {
  'use strict';

  angular
    .module('ooJS')
    .constant('objectHelper', objectHelper)
    .constant('Ruby', Ruby)
    .constant('JavaScript', JavaScript)
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
