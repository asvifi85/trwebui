'use strict';

(function (angular) {

  angular
    .module('webui-sse.dra')
    .controller('DRASkinController', DRASkinController);

  DRASkinController.$inject = ['DRAService'];

  function DRASkinController(DRAService) {

    var vm = this;

    vm.property = 'value';

    DRAService.getContainerMetadataBySort(function(data) {
      vm.dataList = data;
      debugger;
    });
    vm.sortData = 'SavedDate';
  }

})(angular);
