'use strict';

(function (angular) {

  angular
    .module('webui-sse.list')
    .controller('ListController', ListController);

  ListController.$inject = [];

  function ListController() {

    var vm = this;

    vm.property = 'value';

  }

})(angular);
