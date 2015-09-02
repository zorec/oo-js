(function() {
  'use strict';

  angular
    .module('ooJS')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
