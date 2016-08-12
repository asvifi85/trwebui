'use strict';

(function (angular) {

  angular
    .module('webui-sse.components.DraDetailsModule')
    .directive('draDetails', DraDetailsDirective);

  DraDetailsDirective.$inject = [];

  function DraDetailsDirective() {
    return {
      /* bindToController: {
        profile: '='
      },*/
      controller: DraDetailsController,
      controllerAs: 'DSC',
      restrict: 'EA',
      scope: {},
      templateUrl: 'modules/components/dra-details/templates/dra-details.html',
      transclude: true
    };
  }

  DraDetailsController.$inject = ['DRAService'];

  function DraDetailsController(DRAService) {

    var vm = this;

    vm.property = 'value';
    console.log('oi');
    DRAService.getContainerMetadataBySort().then(function(response) {
      console.log('2sS')
      vm.dataList = response.data;
    }, function(response) {
      alert(response + 'error');
    });
    vm.sortData = 'SavedDate';
  }
})(angular);
