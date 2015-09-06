/* global objectHelper:false, toastr:false, moment:false,
   Ruby: false, JavaScript: false, ruby: false, js: false */
(function() {
  'use strict';

  angular
    .module('ooJS')
    .constant('objectHelper', objectHelper)
    .constant('Ruby', Ruby)
    .constant('JavaScript', JavaScript)
    .constant('ruby', ruby)
    .constant('js', js)
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
